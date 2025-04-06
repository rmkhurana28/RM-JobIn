import React from 'react'
import { Link } from 'react-router-dom'

function GetStarted() {
  return (
    <>
        <div className='flex gap-4'>
          <Link to={'user'}>
            <button type="button" className="h-12 w-60 text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-xl px-5 py-2.5 text-center me-2 mb-2">Looking for Job?</button>              
          </Link>
          <Link to={'recruiter'}>
            <button type="button" className="h-12 w-60 text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-xl px-5 py-2.5 text-center me-2 mb-2">Looking to hire?</button>              
          </Link>
        </div>
        
    </>
  )
}

export default GetStarted