import React, { useState } from 'react'
import axios from 'axios';
function RRecruit() {

  const [jobName , setJobName] = useState('');
  const [jobPost , setJobPost] = useState('');
  const [jobSalary , setJobSalary] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();

    axios.post('/api/J/create' , {jobName , jobPost , jobSalary} , {withCredentials : true})      
      .catch(err => {
        console.log('error : ' , err);
      })
    setJobName('')
    setJobPost('')
    setJobSalary('');
  }

  return (
    <>
      <div className='mt-20 h-auto w-[32rem] text-white p-8 rounded-2xl shadow-2xl' style={{ backgroundColor: '#32274c' }}>
        <h1 className='text-center text-4xl text-purple-200'>Offer a Job</h1>
        <form onSubmit={handleFormSubmit}>
          <label
            className='block mb-1 text-2xl text-purple-200'
            htmlFor='Job Name'
          >
            Job Name
          </label>
          <input
            required
            className='outline-none p-3 border-2 border-purple-800 focus:border-purple-500 mb-6 w-full h-14 text-xl text-white bg-[#3d2f5e] rounded-xl shadow-inner placeholder-purple-300'
            type='text'
            placeholder='Job Name'
            value={jobName}
            onChange={(e) => setJobName(e.target.value)}
          />
      
          <label
            className='block mb-1 text-2xl text-purple-200'
            htmlFor='Job Post'
          >
            Job Post
          </label>
          <input
            required
            className='outline-none p-3 border-2 border-purple-800 focus:border-purple-500 mb-6 w-full h-14 text-xl text-white bg-[#3d2f5e] rounded-xl shadow-inner placeholder-purple-300'
            type='text'
            placeholder='Job Post'
            value={jobPost}
            onChange={(e) => setJobPost(e.target.value)}
          />
      
          <label
            className='block mb-1 text-2xl text-purple-200'
            htmlFor='Job Salary'
          >
            Job Salary
          </label>
          <input
            required
            className='outline-none p-3 border-2 border-purple-800 focus:border-purple-500 mb-8 w-full h-14 text-xl text-white bg-[#3d2f5e] rounded-xl shadow-inner placeholder-purple-300'
            type='number'
            placeholder='Job Salary'
            value={jobSalary}
            onChange={(e) => setJobSalary(e.target.value)}
          />
      
          <button
            className='shadow-xl bg-purple-700 w-full text-white text-2xl hover:bg-purple-600 h-14 rounded-xl transition duration-300 ease-in-out'
            type='submit'
          >
            Add
          </button>
        </form>
      </div>

    </>
  )
}

export default RRecruit