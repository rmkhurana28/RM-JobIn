import React, { useEffect, useState } from 'react'
import JobOffer from './JobOffer'
import axios from 'axios';

function Available() {

  const [allJobs , setAllJobs] = useState([]);
  const [appliedJobs , setAppliedJobs] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/U/jobs/available' , {withCredentials : true})
        .then(response => setAllJobs(response.data))
        .catch(error => {
          console.error("Error fetching jobs:", error);
        });
  } , [])
  useEffect(() => {
    axios.get('http://localhost:3000/U/jobs/applied' , {withCredentials : true})
        .then(response => setAppliedJobs(response.data))
        .catch(error => {
          console.error("Error fetching jobs:", error);
        });
  } , [])

  // useEffect(() => {
  //   console.log(allJobs);
  // } , [allJobs])

  return (
    <>
        {/* <div className='bg-[#32274c] w-full h-full mt-4 px-5 py-4'> */}
        <div className="bg-[#32274c] w-full max-h-[80vh] mt-4 px-5 py-4 overflow-y-auto">
            {allJobs.map((job) => {
              let applied = false;
              for(let aJob of appliedJobs){
                if(job._id === aJob._id){
                  applied = true;
                  break;
                }
              }
              // appliedJobs.map((aJob) => {
              //   if(job._id === aJob._id){
              //     applied = true; 
              //     break;
              //   }
              // })
              // <h1 key={job._id}>{job.status}</h1>
              return <JobOffer key={job._id} applied={applied} job={job} />
              
            })}
            {/* <JobOffer key={2} applied={true} job={{}} />
            <JobOffer key={3} job={{}} />
            <JobOffer key={4} job={{}} /> */}

        </div>
    </>
  )
}

export default Available