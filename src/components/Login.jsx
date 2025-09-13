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
        <div>

        </div>
    )
}

export default Login;