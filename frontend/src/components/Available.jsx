import React, { useEffect, useState } from 'react'
import JobOffer from './JobOffer'
import axios from 'axios';

function Available() {

  const [allJobs, setAllJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);

  useEffect(() => {
    axios.get('/api/U/jobs/available', { withCredentials: true })
      .then(response => {
        // If response.data is an object with jobs array inside
        const jobs = Array.isArray(response.data) ? response.data : response.data.jobs || [];
        setAllJobs(jobs);
      })
      .catch(error => {
        console.error("Error fetching available jobs:", error);
      });
  }, []);

  useEffect(() => {
    axios.get('/api/U/jobs/applied', { withCredentials: true })
      .then(response => {
        const jobs = Array.isArray(response.data) ? response.data : response.data.jobs || [];
        setAppliedJobs(jobs);
      })
      .catch(error => {
        console.error("Error fetching applied jobs:", error);
      });
  }, []);

  return (
    <>
      <div className="bg-[#32274c] w-full max-h-[80vh] mt-4 px-5 py-4 overflow-y-auto">
        {Array.isArray(allJobs) && allJobs.map((job) => {
          const applied = appliedJobs.some(aJob => job._id === aJob._id);
          return <JobOffer key={job._id} applied={applied} job={job} />
        })}
      </div>
    </>
  );
}

export default Available;
