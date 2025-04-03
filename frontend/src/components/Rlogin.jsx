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
            const response = await axios.post('http://localhost:3000/R/login' , {email , password,} , { withCredentials: true })
            // .then((response) => {
            //     console.log(response);
            // })

            setEmail('');
            setPassword('');
            // console.log(response.data);
            navigate('/R/jobs');
        } catch(error) {
            setError(error.response.data.error);            
            // console.log('Login Error:', error.response ? error.response.data.error : error.message);
            console.log(error.response.data.error);
        }
        
    }

  return (
    <>
        <div className='bg-white w-140 h-132 overflow-auto border-0 border-blue-200 rounded-md flex flex-col justify-center items-center p-4 shadow-2xl'>
            <h1 className='text-black overflow-auto h-12 bg-blue-400 rounded-lg shadow-2xl w-full text-center text-4xl'>R Login Form</h1>

            {error && <p className="text-red-600 text-xl bg-red-200 p-2 mt-4 rounded">{error}</p>} 

            <form className='p-8 flex flex-col overflow-auto items-center justify-center h-100 w-full ' onSubmit={handleSubmit}>
                <label className='px-1 w-full h-8 text-2xl text-left text-black' htmlFor="Email">Email</label>
                <input required className='p-2 outline-2 outline-gray-400 mt-1 mb-4 w-full h-12 text-2xl text-left text-black rounded-lg shadow-2xl' type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                <label className=' w-full mt-4 h-8 text-2xl text-left text-black' htmlFor="Password">Password</label>
                <input required className='p-2 shadow-2xl outline-2 outline-gray-400 mt-1 w-full h-12 text-2xl text-left text-black rounded-lg' type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                <button className='shadow-xl bg-blue-500 w-full text-white text-3xl hover:bg-blue-700 h-12 mt-10 rounded-lg' type='submit'>Login</button>
            </form>
        </div>

        
    </>
  )
}

export default Rlogin