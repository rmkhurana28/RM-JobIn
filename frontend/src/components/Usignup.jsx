import React from 'react'
import { useState } from 'react';
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom';


function Usignup() {

    const navigate = useNavigate();


    const [name , setName] = useState('');
    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');

    const [error , setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try{
            const response = await axios.post('http://localhost:3000/U/signup' , {name , email , password} , { withCredentials: true });

            setName('');
            setEmail('');
            setPassword('');
            navigate('/user/jobs');
        } catch(error) {
            setError(error.response.data.error);    
            // console.log('Login Error:', error.response ? error.response.data : error.message);
            console.log(error.response.data.error);
        }
    }

  return (
    <>
        <div className='bg-white w-140 h-180 border-0 overflow-auto border-blue-200 rounded-md flex flex-col justify-center items-center p-4 shadow-2xl'>
            <h1 className='text-black h-12 overflow-auto bg-blue-400 rounded-lg shadow-2xl w-full text-center text-4xl'>Signup Form</h1>

            {error && <p className="text-red-600 text-xl bg-red-200 p-2 mt-4 rounded">{error}</p>} 

            <form className='p-8 flex flex-col overflow-auto items-center justify-center h-120 w-full ' onSubmit={handleSubmit}>
                <label className='px-1 w-full h-8 text-2xl text-left text-black' htmlFor="Name">Name</label>
                <input name='name' required className='p-2 outline-2 outline-gray-400 mt-1 mb-4 w-full h-12 text-2xl text-left text-black rounded-lg shadow-2xl' type="text" placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
                <label className='px-1 w-full h-8 text-2xl text-left text-black' htmlFor="Email">Email</label>
                <input name='email' required className='p-2 outline-2 outline-gray-400 mt-1 mb-4 w-full h-12 text-2xl text-left text-black rounded-lg shadow-2xl' type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                <label className=' w-full mt-4 h-8 text-2xl text-left text-black' htmlFor="Password">Password</label>
                <input name='password' required className='p-2 shadow-2xl outline-2 outline-gray-400 mt-1 w-full h-12 text-2xl text-left text-black rounded-lg' type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                <button className='shadow-xl bg-blue-500 w-full text-white text-3xl hover:bg-blue-700 h-12 mt-10 rounded-lg' type='submit'>Signup</button>
            </form>
        </div>
    </>
  )
}

export default Usignup