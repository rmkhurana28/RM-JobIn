import React from 'react'

import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'

function MakeRoutes() {

  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <>
        <Navbar isHome={isHome}/>
        <Outlet />
    </>
  )
}

export default MakeRoutes