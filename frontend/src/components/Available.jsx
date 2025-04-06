import React, { useEffect, useState } from 'react'
import JobOffer from './JobOffer'
import axios from 'axios';

function Available() {

  const [allJobs , setAllJobs] = useState([]);
  const [appliedJobs , setAppliedJobs] = useState([]);

  useEffect(() => {
    axios.get('/api/U/jobs/available' , {withCredentials : true})
        .then(response => setAllJobs(response.data))
        .catch(error => {
          console.error("Error fetching jobs:", error);
        });
  } , [])
  useEffect(() => {
    axios.get('/api/U/jobs/applied' , {withCredentials : true})
        .then(response => setAppliedJobs(response.data))
        .catch(error => {
          console.error("Error fetching jobs:", error);
        });
  } , [])

  return (
    <>
        <div className="bg-[#32274c] w-full max-h-[80vh] mt-4 px-5 py-4 overflow-y-auto">
            {allJobs.map((job) => {
              let applied = false;
              for(let aJob of appliedJobs){
                if(job._id === aJob._id){
                  applied = true;
                  break;
                }
              }              
              return <JobOffer key={job._id} applied={applied} job={job} />
              
            })}            

        </div>
    </>
  )
}

export default Available