import { useState } from 'react'
import './App.css'

import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom' 
import MakeRoutes from './components/MakeRoutes'
import Home from './components/Home'
import UserIn from './components/UserIn'
import Tester from './components/Tester'
import UDash from './components/UDash'
import Available from './components/Available'
import Applied from './components/Applied'
import RecIn from './components/RecIn'
import RDash from './components/RDash'
import ROffered from './components/ROffered'
import RApplications from './components/RApplications'
import RRecruit from './components/RRecruit'

function App() {
  
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<MakeRoutes />} >
        <Route path='' element={<Home />} />
        <Route path='user' element={<UserIn />} />
        <Route path='U/jobs' element={<UDash />}>
          <Route path='available' element={<Available />}/>
          <Route path='applied' element={<Applied />} />
        </Route>
        <Route path='recruiter' element={<RecIn />} />
        <Route path='R/jobs' element={<RDash />}>
          <Route path='offered' element={<ROffered />} />
          <Route path='applications' element={<RApplications/>} />
          <Route path='recruit' element={<RRecruit />} />
        </Route>
        <Route path='test' element={<Tester />} />
      </Route>
    )
  )

  return (
    <>      
      <RouterProvider router={router} />
    </>
  )
}

export default App
