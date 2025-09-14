import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import api from '../api/api.js';


export const fetchLeads = createAsyncThunk('leads/fetchLeads',async({page =1, filters = {} }, thunkAPI) =>{
    try{
        let query = `?page=${page}&limit = 10`;
        for(const key in filters){
            if(filters[key]){
                query+=`&$[key] =${filters[key]}`;
            }
        }

        const response = await api.get('/api/leads'+query);
        return response.data;

    }catch (error){
        return thunkAPI.rejectedWithValue('Failed to fetch leads');

    }
});

export const createLead = createAsyncThunk('leads/createLead',async(leadData,thunkAPI)=>{
    try{
        const response = await api.post('/api/leads',leadData);
        return response.data;
    }catch(error){
        return thunkAPI.rejectedWithValue('Failed to create lead');
    }
});

export const updateLead = createAsyncThunk('leads/updateLead',async({id,leadData},thunkAPI)=>{
    try{
        const response = await api.put(`/api/leads/${id}`,leadData);
        return response.data;
    }
    catch(error){
        return thunkAPI.rejectedWithValue('Failed to update lead');
    }
});

export const deleteLead = createAsyncThunk('leads/deleteLead',async(id,thunkAPI)=>{
    try{
        await api.delete(`/api/leads/${id}`);
        return id;
    }catch(error){
        return thunkAPI.rejectedWithValue('Failed to delete lead');
    }
});

export const fetchLeadById  = createAsyncThunk('leads/fetchLeadById',async(id,thunkAPI)=>{
    try{
        const response = await api.get(`/api/leads/${id}`);
        return response.data;
    }catch(error){
        return thunkAPI.rejectWithValue('Failed to fetch lead details');
    }



}    
);


const leadsSlice = createSlice({
    name:'leads',
    initialState :{
        leads:[],
        currentLeads: null,
        page:1,
        totalPages:1,
        total:0,
        status:null,
        error:null
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchLeads.fulfilled,(state,action)=>{
            state.leads = action.payload.data;
            state.page = action.payload.page;
            state.totalPages = action.payload.totalPages;
            state.total = action.payload.total;
        })
        .addCase(createLead.fulfilled,(state,action)=>{
            state.leads.unshift(action.payload);
})
        .addCase(updateLead.fulfilled,(state,action)=>{
            state.leads = state.leads.map(lead=>
                lead._id === action.payload._id ? action.payload : lead
            );
        })
        .addCase(deleteLead.fulfilled,(state,action)=>{
            state.leads = state.leads.filter(lead=>lead._id !== action.payload);
        })
        .addCase(fetchLeadById.fulfilled,(state,action)=>{
            state.currentLeads = action.payload;
        })
        
    }
});

export default leadsSlice.reducer;