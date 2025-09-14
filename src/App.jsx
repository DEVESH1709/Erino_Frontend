import React from 'react'
import Login from './components/Login';
import {useDispatch,useSelector} from 'react-redux';
import {fetchCurrentUser} from './features/authSlice';
import { useEffect } from 'react';
import Register from './components/Register';
import LeadList from './components/LeadList';
import LeadForm from './components/LeadForm';
import { Navigate } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';

function App() {
  const dispatch = useDispatch ();
  const user  = useSelector(state => state.auth.user);

  useEffect(()=>{
    dispatch(fetchCurrentUser());
  },[dispatch]);
  return(
  <Routes>
    <Route path ="/login" element= {<Login></Login>}></Route>
    <Route path="/register" element={<Register />} />
     <Route path="/leads" element={user ? <LeadList /> : <Navigate to="/login" />} />
      <Route path="/leads/new" element={user ? <LeadForm /> : <Navigate to="/login" />} />
      <Route path="/leads/:id/edit" element={user ? <LeadForm /> : <Navigate to="/login" />} />
      <Route path="/" element={<Navigate to={user ? "/leads" : "/login"} />} />
  </Routes>
  )

}

export default App
