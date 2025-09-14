import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import api from "../api/api.js";



export const registerUser = createAsyncThunk('auth/register',async(userData,thunkAPI)=>{
    try{
        const response  = await api.post('/api/auth/register',userData);
        return response.data;
    }catch(error){
        let message = 'Registration failed';
        if (error.response && error.response.data) {
            message = error.response.data.message || JSON.stringify(error.response.data);
        } else if (error.message) {
            message = error.message;
        }
        return thunkAPI.rejectWithValue(message);
    }
});



export const loginUser = createAsyncThunk('auth/login',async(userData,thunkAPI)=>{
    try{
        const response = await api.post('/api/auth/login',userData);
        return response.data;
    }catch(error){
        let message = 'Login failed';
        if (error.response && error.response.data) {
            message = error.response.data.message || JSON.stringify(error.response.data);
        } else if (error.message) {
            message = error.message;
        }
        return thunkAPI.rejectWithValue(message);
    }
});

export const logoutUser = createAsyncThunk('auth/logout',async(_,thunkAPI)=>{
    try{
        await api.post('/api/auth/logout');
    }
    catch(error){
        return thunkAPI.rejectWithValue('Logout failed');
    }
});


export const fetchCurrentUser = createAsyncThunk('auth/fetchUser',async(_,thunkAPI)=>{
    try{
        const response = await api.get('api/auth/me');
        return response.data;
    } 
    catch(error){
        return thunkApi.rejectedWithValue('No authenticated user');
    }
});


const authSlice = createSlice({
    name :'auth',
    initialState:{
        user:null,
        status: null,
        error:null},
        reducer:{},
        extraReducers:(builder)=>{
            builder
            .addCase(registerUser.fulfilled,(state, action)=>{
                state.user = action.payload;
            })
            .addCase(loginUser.fulfilled, (state,action)=>{
                state.user = action.payload;
            })
            .addCase(fetchCurrentUser.fulfilled, (state,action)=>{
                state.user = action.payload;
            })
            .addMatcher(
                action=> action.type.endsWith('/rejected'),
                (state,action)=>{
                    state.error = action.payload;
                }
            );
        }
});


export default authSlice.reducer;
