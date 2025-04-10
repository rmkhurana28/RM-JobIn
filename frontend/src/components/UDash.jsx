import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate , useLocation, Outlet } from 'react-router-dom';
import Uoptions from './Uoptions';

function UDash() {

  const navigate = useNavigate();

  const [loggedInUser , setLoggedInUser] = useState({});

  useEffect(() => {
    axios.get('/api/U/dashboard' , {withCredentials : true})
      .then(response => setLoggedInUser(response.data))
     .catch(err => {
          console.log(err.message);
          navigate('/user');
     })
  } , [])
  

  return (
    <>
        <div className='bg-transparent text-white w-full h-full px-4 flex flex-col items-center '>
          <Uoptions />
          <Outlet />
        </div>
    </>
  )
}

export default UDash