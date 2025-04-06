import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="min-h-screen bg-[#403162]  text-white">
      
      <div className="flex flex-col items-center justify-center text-center px-4 py-20">
        <h1 className="text-5xl sm:text-6xl font-extrabold text-purple-200 drop-shadow-lg mb-4">
          Welcome to RM-JobIn
        </h1>
        <p className="text-lg sm:text-xl text-purple-100 max-w-160 mb-10">
          Whether you're hunting for your dream job or the perfect candidate, RM-JobIn connects opportunity with talent effortlessly.
        </p>

        <div className="flex flex-col sm:flex-row gap-6">
          <Link to="/user">
            <button className="h-14 w-48 text-white text-lg font-medium bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:from-purple-600 hover:to-purple-800 rounded-2xl drop-shadow-lg transition-all duration-200">
              Find Jobs
            </button>
          </Link>
          <Link to="/recruiter">
            <button className="h-14 w-48 text-white text-lg font-medium bg-gradient-to-r to-purple-500 via-purple-600 from-purple-700 hover:to-purple-600 hover:from-purple-800 rounded-2xl drop-shadow-lg transition-all duration-200">
              Post Job
            </button>
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <footer className=" px-6 py-10 h-95 mt-15">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-purple-200 mb-12">Why Choose RM-JobIn?</h2>
        <div className="grid sm:grid-cols-3  gap-10 max-w-6xl mx-auto text-center">
          <div className="bg-[#2b2142] rounded-2xl p-6 shadow-md">
            <h3 className="text-xl font-semibold text-purple-100 mb-3">Easy Applications</h3>
            <p className="text-purple-300">Apply to jobs in just a few clicks. No hassle, no extra forms.</p>
          </div>
          <div className="bg-[#2b2142] rounded-2xl p-6 shadow-md">
            <h3 className="text-xl font-semibold text-purple-100 mb-3">Smart Dashboard</h3>
            <p className="text-purple-300">Track jobs you’ve applied to and manage listings easily.</p>
          </div>
          <div className="bg-[#2b2142] rounded-2xl p-6 shadow-md">
            <h3 className="text-xl font-semibold text-purple-100 mb-3">Dual Access</h3>
            <p className="text-purple-300">Job seekers and recruiters both have dedicated portals.</p>
          </div>
        </div>
        <p className="mt-12 text-center text-purple-400 text-sm">&copy; 2025 RM-JobIn. All rights reserved.</p>
      </footer>
      
    </div>
  );
}

export default Home;
