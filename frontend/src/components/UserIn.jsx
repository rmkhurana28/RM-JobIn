import React from 'react'
import Ulogin from './Ulogin'
import Usignup from './Usignup'

function UserIn() {
  return (
    <>
      <div className='flex gap-20 bg-#403162 items-center justify-evenly w-full h-200 p-12'>
         <Ulogin />
         <Usignup />
      </div>
    </>
  )
}

export default UserIn