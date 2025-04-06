import axios from 'axios';
import React, { useEffect, useState } from 'react'
import JobOffer from './JobOffer';

function ROffered() {

  const [jobOffered  , setJobOffered] = useState([]);

  useEffect(() => {
    axios.get('/api/R/jobs/offered' , {withCredentials : true})
        .then(response => setJobOffered(response.data))
        .catch(err => {
          console.log(err.message);
     })
  } , [])

  return (
    <>
      <div className="bg-[#32274c] w-full max-h-[80vh] mt-4 px-5 py-4 overflow-y-auto">
        {jobOffered.map((job) => {

          return <JobOffer key={job._id} isRec={true} job={job}/>  
        })}
      </div>
    </>
  )
}

export default ROffered