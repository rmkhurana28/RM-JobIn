import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState , useEffect} from 'react';
import axios from 'axios';
import Roptions from './Roptions';
import { Outlet } from 'react-router-dom';

function RDash() {
    const navigate = useNavigate();

    const [loggedInRec , setLoggedInRec] = useState({});
  
    useEffect(() => {
      axios.get('/api/R/dashboard' , {withCredentials : true})
        .then(response => setLoggedInRec(response.data))
       .catch(err => {
            console.log(err.message);
            navigate('/recruiter');
       })
    } , [])
    
  
    return (
      <>
          <div className='bg-transparent text-white w-full h-full px-4 flex flex-col items-center '>
            <Roptions />
            <Outlet />
          </div>
      </>
    )
}

export default RDash