import React, { useEffect, useState } from 'react'
import JobOfferApplications from './JobOfferApplications'
import axios from 'axios'

function RApplications() {

  const [appJobs , setAppJobs] = useState([])

  useEffect(() => {
    axios.get('/api/R/jobs/applications' , {withCredentials : true})
        .then(response => setAppJobs(response.data))
      .catch(err => {console.log('Error : ' , err);})
  } , [])


  return (
    <>
      <div className="bg-[#32274c] w-full max-h-[80vh] mt-4 px-5 py-4 overflow-y-auto">
        {appJobs.map((job) => {
          
          return <JobOfferApplications key={job._id} job={job}/>
        })}
      </div>
    </>
  )
}

export default RApplications