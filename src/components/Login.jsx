import React,{useState} from 'react';
import {useDispatch} from "react-redux";
import {loginUser} from '../features/authSlice';
import {useNavigate} from 'react-router-dom';


function Login(){
    const [email,setEmail]  = useState('');
    const [password,setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();



    return (
        <div className = "min-h-screen flex items-center justify-center">
      
<form className = "p-6 rounded shadow-md w-full max-w-md">
 <h2 className = "text-2xl mb-4">
 Login

 </h2>

 <div className = "mb-4">
 <label className = >

 </label>

 </div>
    
</form>

        </div>
    )
}

export default Login;