import React, { useState, useEffect } from 'react'
import axios from 'axios';
import JobOffer from './JobOffer';

function Applied() {

  const [appliedJobs, setAppliedJobs] = useState([]);

  useEffect(() => {
    axios.get('/api/U/jobs/applied', { withCredentials: true })
      .then(response => {
        // Handle both array and object responses
        const jobs = Array.isArray(response.data) 
          ? response.data 
          : response.data.jobs || [];

        setAppliedJobs(jobs);
      })
      .catch(error => {
        console.error("Error fetching applied jobs:", error);
      });
  }, [])

  return (
    <>
      <div className="bg-[#32274c] w-full max-h-[80vh] mt-4 px-5 py-4 overflow-y-auto">
        {Array.isArray(appliedJobs) && appliedJobs.map((job) => (
          <JobOffer key={job._id} canApply={false} applied={true} job={job} />
        ))}
      </div>
    </>
  )
}

export default Applied;
