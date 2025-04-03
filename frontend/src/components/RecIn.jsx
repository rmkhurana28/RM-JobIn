import React from 'react'
import Rlogin from './Rlogin'
import Rsignup from './Rsignup'

function RecIn() {
  return (
    <>
        <div className='flex gap-20 bg-#403162 items-center justify-evenly w-full h-200 p-12'>
            <Rlogin />
            <Rsignup />
        </div>
    </>
  )
}

export default RecIn