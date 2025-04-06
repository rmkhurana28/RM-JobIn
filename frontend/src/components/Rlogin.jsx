import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';


function Rlogin() {
    const navigate = useNavigate();


    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');

    const [error , setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('')

        try{
            const response = await axios.post('/api/R/login' , {email , password,} , { withCredentials: true })            

            setEmail('');
            setPassword('');
            navigate('/R/jobs');
        } catch(error) {
            setError(error.response.data.error);            
            console.log(error.response.data.error);
        }
        
    }

  return (
    <>
        <div className="mt-20 h-auto w-[38rem] text-white p-10 rounded-2xl shadow-2xl" style={{ backgroundColor: '#32274c' }}>
          <h1 className="text-center text-5xl text-purple-200 mb-8">Recruiter | Login Form</h1>

          {error && (
            <p className="text-red-500 text-2xl bg-red-100 p-3 mb-8 rounded text-center w-full">
              {error}
            </p>
          )}

          <form className="flex flex-col w-full" onSubmit={handleSubmit}>
            <label className="block mb-2 text-3xl text-purple-200" htmlFor="Email">
              Email
            </label>
            <input
              required
              className="outline-none p-4 border-2 border-purple-800 focus:border-purple-500 mb-8 w-full h-16 text-2xl text-white bg-[#3d2f5e] rounded-xl shadow-inner placeholder-purple-300"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label className="block mb-2 text-3xl text-purple-200" htmlFor="Password">
              Password
            </label>
            <input
              required
              className="outline-none p-4 border-2 border-purple-800 focus:border-purple-500 mb-10 w-full h-16 text-2xl text-white bg-[#3d2f5e] rounded-xl shadow-inner placeholder-purple-300"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              className="shadow-xl bg-purple-700 w-full text-white text-3xl hover:bg-purple-600 h-16 rounded-xl transition duration-300 ease-in-out"
              type="submit"
            >
              Login
            </button>
          </form>
        </div>        
    </>
  )
}

export default Rlogin