import React from 'react'
import GetStarted from './GetStarted'
import Logout from './Logout'
import { Link , useLocation} from 'react-router-dom'



function Navbar({isHome = false}) {

  const location = useLocation();
  const path = location.pathname;

  const isUser = path === '/user';
  const isJobs = path === '/recruiter';

  return (
    <>
        <div className="w-full h-32 relative flex items-center justify-between p-10 bg-gradient-to-t from-[#403162] to-[#32274c]">
          <h1 className='w-30 text-white text-2xl'></h1>

          <div className='text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
            <Link to={'/'}>
              <h1 className="h-full w-full text-6xl text-purple-200 drop-shadow-[0_0_6px_rgba(168,85,247,0.8)]">
                RM-JobIn
              </h1>
            </Link>
          </div>

          <div className='w-120'>
            {isHome ? (
              null
            ) : isUser || isJobs ? null : (
              <Logout />
            )}
            
          </div>
        </div>
    </>
  )
}

export default Navbar
