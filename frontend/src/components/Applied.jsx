import React, { useState , useEffect} from 'react'
import axios from 'axios';
import JobOffer from './JobOffer';

function Applied() {

  const [appliedJobs , setAppliedJobs] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/U/jobs/applied' , {withCredentials : true})
        .then(response => setAppliedJobs(response.data))
        .catch(error => {
          console.error("Error fetching jobs:", error);
        });
  } , [])

  // useEffect(() => {
  //   console.log(appliedJobs);
  // } , [appliedJobs])

  return (
    <>
      <div className="bg-[#32274c] w-full max-h-[80vh] mt-4 px-5 py-4 overflow-y-auto">
      {appliedJobs.map((job) => (
              // <h1 key={job._id}>{job.status}</h1>
              <JobOffer key={job._id} canApply={false} applied={true} job={job} />
              
            ))}
            {/* <JobOffer key={2} canApply={false} job={{}} />
            <JobOffer key={3} canApply={false} applied={true} job={{}} /> */}
            
      </div>
    </>
  )
}

export default Applied