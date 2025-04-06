import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link , useNavigate } from 'react-router-dom'

function Logout() {  

  const navigate = useNavigate();
  const path = location.pathname;

  let who = null;

  if (path.startsWith('/U/jobs')) {
    who = 'user';
  } else if (path.startsWith('/R/jobs')) {
    who = 'recruiter';
  }

  const handleLogout = () => {  
    axios.post(`/api/${who === 'user' ? 'U' : 'R'}/logout` , {} , {withCredentials : true})
        .catch(err => {
          console.log(err);
        })

    navigate('/');
  }

  return (
    <>
        <div className=' flex items-center justify-end'>
            <button type="button" className="h-12 w-40 text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-xl px-5 py-2.5 text-center me-2 mb-2"
            onClick={handleLogout}
            >
              Logout
            </button>            
        </div>
        
    </>
  )
}

export default Logout