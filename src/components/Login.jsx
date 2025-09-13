import React,{useState} from 'react';
import {useDispatch} from "react-redux";
import {loginUser} from '../features/authSlice';
import {useNavigate} from 'react-router-dom';


function Login(){
    const [email,setEmail]  = useState('');
    const [password,setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();


const handleSubmit = async(e)=>{
    e.preventDefault();
    try{
        await dispatch(loginUser({email,password})).unwrap();
        navigate('/leads');
    }
    catch(error){
        alert(error);
    }
};
    return (
        <div className = "min-h-screen flex items-center justify-center">
      
<form onSubmit={handleSubmit} className = "p-6 rounded shadow-md w-full max-w-md">
 <h2 className = "text-2xl mb-4">
 Login

 </h2>

 <div className = "mb-4">
 <label className = "block">
 Email : </label>
 <imput
className= "border rounded w-full py-2 px-3"
    type = "email"
    value  ={email}
    onChange = {e=>setEmail(e.target.value)}
    required

 />
 </div>

 <div className = "mb-4">
    <label className = "block"> Password</label>
  <input
    className="border rounded w-full py-2 px-3"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
  />
 </div>
    
    <button className="bg-blue-500 text-white py-2 px-4 rounded" type="submit">
          Login
        </button>

        <p className= "mt-4 text-sm">
              Don't have an account? <span className="text-blue-500 cursor-pointer" onClick={() => navigate('/register')}>Register</span>

        </p>
</form>

        </div>
    )
}

export default Login;