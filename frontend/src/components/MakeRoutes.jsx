import React from 'react'

import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'

function MakeRoutes() {

  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    // <>
    //     <Navbar isHome={isHome}/>
    //     <Outlet />        
    // </>
    <div className="h-screen overflow-hidden flex flex-col">
      <Navbar isHome={isHome} />
      <div className="flex-grow overflow-hidden">
        <Outlet />
      </div>
    </div>
  )
}

export default MakeRoutes