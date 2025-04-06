import axios from 'axios';
import React, { useEffect, useState } from 'react'


function JobOfferApplications({job={}}) {

    const [isEditable , setIsEditable] = useState(false);

    const [jobName , setJobName] = useState(job.job_name);
    const [jobPost , setJobPost] = useState(job.post);
    const [jobSalary , setJobSalary] = useState(job.salary);
    const [jobStatus , setJobStatus] = useState(job.status)
    
    const [allApplicantsObj , setAllApplicantsObj] = useState([])

    useEffect(() => {
      if(job?.applied_by?.length > 0){
        job.applied_by.map((user) => {
          setAllApplicantsObj(prev => prev.concat({
            name : user.name,
            id : user._id,
          }))
        })
      }    
      
    } , [])
   
    const [jobApplicantSelected , setJobApplicantSelected] = useState('Select Applicant');


    const [withdrawEd , setWithdrawEd] = useState(false);

    const toggleEditable = () => {
      if(!isEditable) setIsEditable(!isEditable);

      axios.put(`/api/J/jobs/applications/update/${job._id}` , {jobName , jobPost , jobSalary , jobStatus} , {withCredentials : true})
      .catch(err => {
        console.log('error : ' , err);
      })
      setIsEditable(!isEditable);
      
    }

    const withdraw = () => {
    
      axios.put(`/api/R/jobs/offered/withdraw/${job._id}` , {} , {withCredentials : true})
      .catch(error => {
        console.error("error : ", error.message);
      });
      setWithdrawEd(true);
    }

    const approve = () => {
      if(jobApplicantSelected === 'Select Applicant') return;
      setAllApplicantsObj(prev => 
        prev.filter(obj => obj.id !== jobApplicantSelected)
      )
      axios.put(
        `/api/J/jobs/applications/accept/${jobApplicantSelected}` ,
        {job},
        {withCredentials : true}
      )
    }    

  return (
    <>
        <div className='bg-[#403162] w-full h-50 mb-6 flex gap-4 items-center justify-evenly p-2'>
            <div className=' w-1/6 h-full flex flex-col gap-4 '>
                <input className={`${isEditable? ' underline decoration-2' : 'cursor-default'} outline-none text-5xl`} type="text" value={jobName} onChange={(e) => setJobName(e.target.value)} readOnly={!isEditable}/>
                <input className={`${isEditable? ' underline decoration-2' : 'cursor-default'} outline-none text-4xl`} type="text" value={jobPost} onChange={(e) => setJobPost(e.target.value)} readOnly={!isEditable}/>
            </div>
            <div className=' w-1/6 h-full flex flex-col gap-4 '>
             <h1 className='text-2xl'>Expected Salary : </h1>
              <input className={`${isEditable? ' underline decoration-2' : 'cursor-default'} outline-none text-5xl`} type="text" value={jobSalary} onChange={(e) => setJobSalary(e.target.value)} readOnly={!isEditable}/>
            </div>
            <div className=' w-1/6 h-full flex flex-col gap-4'>
              <h1 className='text-2xl'>Status : </h1>
              <input className={`${isEditable? ' underline decoration-2' : 'cursor-default'} outline-none text-5xl`} type="text" value={jobStatus} onChange={(e) => setJobStatus(e.target.value)} readOnly={!isEditable}/>

            </div>
            <div className=' text-white w-1/6 h-full flex flex-col gap-4'>
              <h1 className='text-xl'>&#8608; applied by</h1>
              <select className='outline-none bg-[#36294F] text-white rounded-lg px-1 py-1  text-2xl'
                      value={jobApplicantSelected}
                      onChange={(e) => setJobApplicantSelected(e.target.value)}
              >                
                <option value="select">Select</option>

                {allApplicantsObj?.length > 0 ? ( 
                  allApplicantsObj.map((obj) => (
                    <option className='text-white rounded-md' key={obj.id} value={obj.id}>
                      {obj.name}
                    </option>
                  ))
                ): (
                  <option key={'0'} disabled>No applicants</option>
                )}
              </select>
              <div className='flex gap-2 items-center justify-center'>
                <button
                    className={`w-30 h-14 relative font-inherit text-center text-[23px] px-[2.7em] py-[0.6em] tracking-[0.06em] rounded-[0.6em] rounded-bl-2xl border-2 border-[#4CAF50] transition-all duration-500 overflow-hidden flex items-center justify-center
                    text-[#4CAF50] bg-transparent shadow-[inset_0_0_10px_rgba(76,175,80,0.2),0_0_9px_3px_rgba(76,175,80,0.1)] before:absolute before:left-[-4em] before:w-[4em] before:h-full before:top-0 before:bg-gradient-to-r before:from-transparent before:via-[#4caf502a] before:to-transparent before:transition-transform before:duration-400 hover:text-[#A5D6A7] hover:shadow-[0_4px_15px_rgba(76,175,80,0.5),inset_0_0_10px_rgba(76,175,80,0.3)] hover:before:translate-x-[15em] cursor-pointer `}
                    onClick={approve}
                    disabled={jobApplicantSelected === 'Select Applicant'}
                >
                  Approve
                </button>
                <button
                    className={`w-30 h-14 relative font-inherit text-center text-[23px] px-[2.7em] py-[0.6em] tracking-[0.06em] rounded-[0.6em] rounded-bl-2xl border-2 border-[#D32F2F] transition-all duration-500 overflow-hidden flex items-center justify-center
                    text-[#D32F2F] bg-transparent shadow-[inset_0_0_10px_rgba(211,47,47,0.2),0_0_9px_3px_rgba(211,47,47,0.1)] before:absolute before:left-[-4em] before:w-[4em] before:h-full before:top-0 before:bg-gradient-to-r before:from-transparent before:via-[#d32f2f2a] before:to-transparent  before:transition-transform before:duration-400 hover:text-[#FFCDD2]  hover:shadow-[0_4px_15px_rgba(211,47,47,0.5),inset_0_0_10px_rgba(211,47,47,0.3)]  hover:before:translate-x-[15em] cursor-pointer`}
                    onClick={approve}
                >
                    Reject
                </button>
              </div>
            </div>
            <div className='flex flex-col gap-2 items-center justify-center w-1/4 h-full'>
              <button className={`w-70 h-15 relative font-inherit text-[23px] px-[2.7em] py-[0.6em] tracking-[0.06em] rounded-[0.6em] rounded-bl-2xl border-2 border-[#FFC107] transition-all duration-300 overflow-hidden  ${!isEditable ? "text-white bg-gradient-to-r from-[#FFC107] via-[#FFD54F] to-[#FFC107] shadow-[0_4px_15px_rgba(255,193,7,0.6),inset_0_0_10px_rgba(255,193,7,0.4)]" : "text-[#FFC107] bg-transparent shadow-[inset_0_0_10px_rgba(255,193,7,0.2),0_0_9px_3px_rgba(255,193,7,0.1)]"} before:absolute before:left-[-4em] before:w-[4em] before:h-full before:top-0 before:bg-gradient-to-r before:from-transparent before:via-[#ffc1072a] before:to-transparent before:transition-transform before:duration-400  hover:text-[#FFECB3] hover:shadow-[0_4px_15px_rgba(255,193,7,0.5),inset_0_0_10px_rgba(255,193,7,0.3)] hover:before:translate-x-[15em]  cursor-pointer transition-colors duration-500 `}
                      onClick={toggleEditable}
              >
                {!isEditable ? 'Edit' : 'Save'}
              </button>

              <button className={`w-70 h-20 relative font-inherit text-[20px] px-[2.7em] py-[0.6em] tracking-[0.06em] rounded-[0.6em] rounded-bl-2xl border-2 border-[#A070FF] transition-all duration-300 overflow-hidden  ${!withdrawEd ? "text-white bg-gradient-to-r from-[#A070FF] via-[#B390FF] to-[#A070FF] shadow-[0_4px_15px_rgba(160,112,255,0.6),inset_0_0_10px_rgba(160,112,255,0.4)]" : "text-[#A070FF] bg-transparent shadow-[inset_0_0_10px_rgba(160,112,255,0.2),0_0_9px_3px_rgba(160,112,255,0.1)]"} before:absolute before:left-[-4em] before:w-[4em] before:h-full before:top-0 before:bg-gradient-to-r before:from-transparent before:via-[#a070ff2a] before:to-transparent before:transition-transform before:duration-400  hover:text-[#D8BFFF] hover:shadow-[0_4px_15px_rgba(160,112,255,0.5),inset_0_0_10px_rgba(160,112,255,0.3)] hover:before:translate-x-[15em]  cursor-pointer transition-colors duration-500 `}
                onClick={withdraw}
              >
                {!withdrawEd? 'Click to Withdraw' : 'Withdrawed'}
              </button>
              
                

            </div>            
        </div>
    </>
  )
}

export default JobOfferApplications