import React from 'react'
import { Link, NavLink } from 'react-router-dom'

function Uoptions() {
  return (
    <>
        <div className='bg-[#32274c] w-110 h-18 rounded-b-full shadow-2xl flex items-center justify-evenly'>            
            <NavLink to='/U/jobs/available'>
                {({ isActive }) => (
                    <button className={`relative font-inherit text-[15px] px-[2.7em] py-[0.6em] tracking-[0.06em] rounded-[0.6em] rounded-bl-2xl border-2 border-[#A070FF] transition-all duration-300 overflow-hidden  ${isActive ? "text-white bg-gradient-to-r from-[#A070FF] via-[#B390FF] to-[#A070FF] shadow-[0_4px_15px_rgba(160,112,255,0.6),inset_0_0_10px_rgba(160,112,255,0.4)]" : "text-[#A070FF] bg-transparent shadow-[inset_0_0_10px_rgba(160,112,255,0.2),0_0_9px_3px_rgba(160,112,255,0.1)]"} before:absolute before:left-[-4em] before:w-[4em] before:h-full before:top-0 before:bg-gradient-to-r before:from-transparent before:via-[#a070ff2a] before:to-transparent before:transition-transform before:duration-400  hover:text-[#D8BFFF] hover:shadow-[0_4px_15px_rgba(160,112,255,0.5),inset_0_0_10px_rgba(160,112,255,0.3)] hover:before:translate-x-[15em]  cursor-pointer transition-colors duration-500 `}>
                    Available
                    </button>
                )}
            </NavLink>

            
            <NavLink to='/U/jobs/applied'>
                {({ isActive }) => (
                    <button className={`relative font-inherit text-[15px] px-[2.7em] py-[0.6em] tracking-[0.06em] rounded-[0.6em] rounded-br-2xl border-2 border-[#A070FF] transition-all duration-300 ease-in-out overflow-hidden  ${isActive ? "text-white bg-gradient-to-r from-[#A070FF] via-[#B390FF] to-[#A070FF] shadow-[0_4px_15px_rgba(160,112,255,0.6),inset_0_0_10px_rgba(160,112,255,0.4)]" : "text-[#A070FF] bg-transparent shadow-[inset_0_0_10px_rgba(160,112,255,0.2),0_0_9px_3px_rgba(160,112,255,0.1)]" } before:absolute before:left-[-4em] before:w-[4em] before:h-full before:top-0 before:bg-gradient-to-r before:from-transparent before:via-[#a070ff2a] before:to-transparent before:transition-transform before:duration-400  hover:text-[#D8BFFF] hover:shadow-[0_4px_15px_rgba(160,112,255,0.5),inset_0_0_10px_rgba(160,112,255,0.3)] hover:before:translate-x-[15em] cursor-pointer transition-colors duration-500 `}>
                    Applied
                    </button>
                )}
            </NavLink>

        </div>
    </>
  )
}

export default Uoptions