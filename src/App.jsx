import React from 'react'
import Login from './components/Login';
import {useDispatch,useSelector} from 'react-redux';
import {fetchCurrentUser} from './features/authSlice';
import { useEffect } from 'react';
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
  </Routes>
  )

}

export default App
