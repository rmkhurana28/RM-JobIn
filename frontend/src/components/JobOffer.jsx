import React, { useEffect, useState } from 'react'
import axios from 'axios';

function JobOffer({isRec=false , canApply=true , applied=false , job={}}) {

  const [jobOfferStatus , setJobOfferStatus] = useState()
  const [withdrawEd , setWithdrawEd] = useState(false);

  useEffect(() => {
    setJobOfferStatus(applied);
  } , [])

  const apply = () => {
    
    if(!canApply) return console.log('U can not apply from applied page');  
    axios.post(`/api/U/jobs/apply/${job._id}` , {} , {withCredentials : true})
    .catch(error => {
      console.error("error : ", error.message);
    });
    setJobOfferStatus(!jobOfferStatus)
  }

  const unApply = () => {
    axios.post(`/api/U/jobs/unApply/${job._id}` , {} , {withCredentials : true})
    .catch(error => {
      console.error("error : ", error.message);
    });
    setJobOfferStatus(!jobOfferStatus)
  }

  const withdraw = () => {
    
    axios.put(`/api/R/jobs/offered/withdraw/${job._id}` , {} , {withCredentials : true})
    .catch(error => {
      console.error("error : ", error.message);
    });
    setWithdrawEd(true);
  }

  return (
    <>
        <div className='bg-[#403162] w-full h-50 mb-6 flex gap-4 items-center justify-evenly p-2'>
            <div className=' w-1/4 h-full flex flex-col gap-4 justify-start overflow-hidden'>
              <h1 className='text-5xl'>{job.job_name}</h1>
              <h1 className='text-3xl'>&#8608; {job.post}</h1>
            </div>
            <div className=' w-1/4 h-full flex flex-col gap-4 '>
              <h1 className='text-2xl'>Expected Salary : </h1>
              <h1 className='text-xl'>&#8608; ${job.salary}</h1>
            </div>
            <div className=' w-1/4 h-full flex flex-col gap-4'>
              <h1 className='text-2xl'>Status : </h1>
              <h1 className='text-xl'>&#8608; {job.status}</h1>
            </div>
            <div className='flex items-center justify-center w-1/4 h-full'>              
              {isRec ? 
                <button className={`w-70 h-20 relative font-inherit text-[20px] px-[2.7em] py-[0.6em] tracking-[0.06em] rounded-[0.6em] rounded-bl-2xl border-2 border-[#A070FF] transition-all duration-300 overflow-hidden  ${!withdrawEd ? "text-white bg-gradient-to-r from-[#A070FF] via-[#B390FF] to-[#A070FF] shadow-[0_4px_15px_rgba(160,112,255,0.6),inset_0_0_10px_rgba(160,112,255,0.4)]" : "text-[#A070FF] bg-transparent shadow-[inset_0_0_10px_rgba(160,112,255,0.2),0_0_9px_3px_rgba(160,112,255,0.1)]"} before:absolute before:left-[-4em] before:w-[4em] before:h-full before:top-0 before:bg-gradient-to-r before:from-transparent before:via-[#a070ff2a] before:to-transparent before:transition-transform before:duration-400  hover:text-[#D8BFFF] hover:shadow-[0_4px_15px_rgba(160,112,255,0.5),inset_0_0_10px_rgba(160,112,255,0.3)] hover:before:translate-x-[15em]  cursor-pointer transition-colors duration-500 `}
                onClick={withdraw}
                >
                  {!withdrawEd? 'Click to Withdraw' : 'Withdrawed'}
                </button>
              :
                <button className={`w-70 h-20 relative font-inherit text-[30px] px-[2.7em] py-[0.6em] tracking-[0.06em] rounded-[0.6em] rounded-bl-2xl border-2 border-[#A070FF] transition-all duration-300 overflow-hidden  ${jobOfferStatus ? "text-white bg-gradient-to-r from-[#A070FF] via-[#B390FF] to-[#A070FF] shadow-[0_4px_15px_rgba(160,112,255,0.6),inset_0_0_10px_rgba(160,112,255,0.4)]" : "text-[#A070FF] bg-transparent shadow-[inset_0_0_10px_rgba(160,112,255,0.2),0_0_9px_3px_rgba(160,112,255,0.1)]"} before:absolute before:left-[-4em] before:w-[4em] before:h-full before:top-0 before:bg-gradient-to-r before:from-transparent before:via-[#a070ff2a] before:to-transparent before:transition-transform before:duration-400  hover:text-[#D8BFFF] hover:shadow-[0_4px_15px_rgba(160,112,255,0.5),inset_0_0_10px_rgba(160,112,255,0.3)] hover:before:translate-x-[15em]  cursor-pointer transition-colors duration-500 `}
                        onClick={jobOfferStatus? unApply : apply}
                >
                  {jobOfferStatus? 'Applied' : 'Apply'}
                </button>
               }
              
            </div>            
        </div>
    </>
  )
}

export default JobOffer