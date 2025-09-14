import React, {useEffect,useRef} from "react";
import {useSelector,useDispatch} from 'react-redux';
import {fetchLeads, deleteLead} from "../features/leadsSlice";
import {useNavigate} from 'react-router-dom';

import { AgGridReact } from 'ag-grid-react';
// import { ModuleRegistry, AllModules } from 'ag-grid-community';
// ModuleRegistry.registerModules(AllModules);
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

// Register modules once
ModuleRegistry.registerModules([AllCommunityModule]);
function LeadList(){

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const leads = useSelector(state => state.leads.leads);
    const page = useSelector(state=>state.leads.page);
    const totalPages = useSelector(state=>state.leads.totalPages);
    const total = useSelector(state=>state.leads.total);
    const gridRef = useRef();


    useEffect(()=>{
        dispatch(fetchLeads({page:1}));
    },[dispatch]);

    const onGridReady = params =>{
        gridRef.current = params.api;
    };

    const onPaginationChanged = ()=>{
        if(gridRef.current){
            const newPage = gridRef.current.paginationGetCurrentPage()+1;
            if(newPage !==page){
                dispatch(fetchLeads({page :newPage}));
            }
        }
    };

    const onFilterChanged = ()=>{
        if(gridRef.current){
            const model = gridRef.current.getFilterModel();
            const filters ={};

            ['email','company','city'].forEach(field=>{
                if(model[field]?.filter){
                    if(model[field].type ==='contains'){
                        filters[`${field}_contains`] = model[field].filter;
                    }
                    else{
                        filters[field] = model[field].filter;
                    }
                }
            });
['status','source'].forEach(field=>{
    if(model[field]?.values){
        const values = model[field].values;
        if(values.length >0){
            if(values.length >1){
                filters[`${field}_in`] = values.json(',');
            }
            else{
                filters[field] = values[0];
            }
        }
    }
});

  ['score', 'lead_value'].forEach(field => {
        if (model[field]) {
          const { type, filter, filterTo } = model[field];
          if (type === 'inRange') {
            filters[`${field}_between`] = `${filter},${filterTo}`;
          } else if (type === 'greaterThan') {
            filters[`${field}_gt`] = filter;
          } else if (type === 'lessThan') {
            filters[`${field}_lt`] = filter;
          } else if (type === 'equals') {
            filters[field] = filter;
          }
        }
      });
       ['created_at', 'last_activity_at'].forEach(field => {
        if (model[field]) {
          const { type, dateFrom, dateTo } = model[field];
          if (type === 'inRange') {
            filters[`${field}_between`] = `${dateFrom},${dateTo}`;
          } else if (type === 'equals') {
            filters[`${field}_on`] = dateFrom;
          } else if (type === 'lessThan') {
            filters[`${field}_before`] = dateFrom;
          } else if (type === 'greaterThan') {
            filters[`${field}_after`] = dateFrom;
          }
        }
        });

        if(model.is_qualified?.values){
            const values = model.is_qualified.values;
            if(values.length >0){
             filters.is_qualified = values[0];     
        }
        }
        dispatch(fetchLeads({page:1,filters}));
        }

    };

   const actionCellRenderer = params=>{
        return(
            <div>
                <button className = "text-blue-500 mr-2" onClick={()=>
                    navigate(`/leads/${params.data._id}/edit`)}
                    >
                  Edit
                </button>
                <button className = "text-red-600" onClick = {()=>{
                    if(window.confirm('Delete this lead?')){
                        dispatch(deleteLead(params.data._id));
                    }
                }}
                >
                Delete
                </button>
            </div>
        );
    };

    const columns=[
         { headerName: "First Name", field: "first_name", filter: 'agTextColumnFilter' },
    { headerName: "Last Name",  field: "last_name",  filter: 'agTextColumnFilter' },
    { headerName: "Email",      field: "email",      filter: 'agTextColumnFilter' },
    { headerName: "Phone",      field: "phone" },
    { headerName: "Company",    field: "company",    filter: 'agTextColumnFilter' },
    { headerName: "City",       field: "city",       filter: 'agTextColumnFilter' },
    { headerName: "State",      field: "state" },
    { headerName: "Source",     field: "source",     filter: 'agSetColumnFilter' },
    { headerName: "Status",     field: "status",     filter: 'agSetColumnFilter' },
    { headerName: "Score",      field: "score",      filter: 'agNumberColumnFilter' },
    { headerName: "Value",      field: "lead_value", filter: 'agNumberColumnFilter' },
    { headerName: "Last Activity", field: "last_activity_at", filter: 'agDateColumnFilter' },
    { headerName: "Qualified",  field: "is_qualified", filter: 'agSetColumnFilter', valueFormatter: params => params.value ? 'Yes' : 'No' },
    { headerName: "Actions",    field: "_id", cellRendererFramework: actionCellRenderer }
    ]

    return(
        <div className="p-4">
        <div className="flex justify-between mb-2">
        <h1 className= "text-2xl">Leads</h1>
     <button className = "text-black px-4 py-2 rounded" onClick={()=>navigate('/leads/new')}>

            Add Lead
     </button>
        </div>
        <div className  ="ag-theme-alpine" style={{ height: 500, width: '100%' }}>

           <AgGridReact
          ref={gridRef}
          rowData={leads}
          columnDefs={columns}
           theme="legacy"
          pagination={true}
          paginationPageSize={10}
          // paginationPageSizeSelector={[10, 20, 50, 100]}
          onGridReady={onGridReady}
          onPaginationChanged={onPaginationChanged}
          onFilterChanged={onFilterChanged}
          rowSelection={{ type: "multiRow" }}
          
        />  
        </div>
         <div className="mt-2">
        Page {page} of {totalPages} (Total: {total} leads)
      </div>
</div>
    )
}

export default LeadList;