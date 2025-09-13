import React, {useEffect,useRef} from "react";
import {useSelector,useDispatch} from 'react-redux';
import {fetchLeads, deleteLead} from "../features/leadsSlice";
import {useNavigate} from 'react-router-dom';
import {AGGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/ag-grid.css';
import 'ag-grid-community/dist/ag-theme-alpine.css';

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
        gridRef.current = params.api;

    };

    

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
          pagination={true}
          paginationPageSize={10}
          onGridReady={onGridReady}
          onPaginationChanged={onPaginationChanged}
          onFilterChanged={onFilterChanged}
          rowSelection="single"
        />  
        </div>
         <div className="mt-2">
        Page {page} of {totalPages} (Total: {total} leads)
      </div>
</div>
    )
}