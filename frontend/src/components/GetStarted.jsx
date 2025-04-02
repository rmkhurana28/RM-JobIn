import React from 'react'
import { Link } from 'react-router-dom'

function GetStarted() {
  return (
    <>
        <div className='flex gap-4'>
        <Link to={'user'}>
            <button type="button" className="px-6 py-3.5 text-base font-medium text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Looking for Job?</button>
        </Link>
        <Link to={'recruiter'}>
            <button type="button" className="px-6 py-3.5 text-base font-medium text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Looking to Hire?</button>
        </Link>
        </div>
        
    </>
  )
}

export default GetStarted