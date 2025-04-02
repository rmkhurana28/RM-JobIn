import React from 'react'
import GetStarted from './GetStarted'
import Logout from './Logout'



function Navbar({isHome = false}) {
  return (
    <>
        <div className='bg-blue-400 w-full h-32 flex align-middle justify-between p-10'>
            <h1>logo</h1>
            <h1>RM</h1>
            {isHome ? <GetStarted /> : <Logout /> }
            
        </div>
    </>
  )
}

export default Navbar