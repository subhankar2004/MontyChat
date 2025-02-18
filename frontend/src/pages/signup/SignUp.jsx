import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import Gendercheckbox from './Gendercheckbox';

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
      <div className='w-full p-6 rounded-lg shadow-md bg-grey-400 bg-clip-padding backdrop-blur-lg backdrop-filter bg-opacity-0'>
        <h1 className='text-3xl text-center font-semibold text-gray-300'>SignUp
          <span className='text-blue-500 ml-2'>MontyChat</span>
        </h1>

        <form action="#">
          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>Full Name:</span>
            </label>
            <input type="text" placeholder="Enter Full Name" className='w-full input input-bordered h-10'/>
          </div>
          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>Username:</span>
            </label>
            <input type="text" placeholder="Subhankar2004" className='w-full input input-bordered h-10'/>
          </div>
          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>Password:</span>
            </label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="********" 
                className='w-full input input-bordered h-10'
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 transition-transform hover:scale-110 active:scale-95"
              >
                {showPassword ? (
                  <Eye className="w-5 h-5 text-gray-500 hover:text-blue-500 transition-colors duration-200" />
                ) : (
                  <EyeOff className="w-5 h-5 text-gray-500 hover:text-blue-500 transition-colors duration-200" />
                )}
              </button>
            </div>
          </div>
          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>Confirm Password:</span>
            </label>
            <div className="relative">
              <input 
                type={showConfirmPassword ? "text" : "password"} 
                placeholder="********" 
                className='w-full input input-bordered h-10'
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 transition-transform hover:scale-110 active:scale-95"
              >
                {showConfirmPassword ? (
                  <Eye className="w-5 h-5 text-gray-500 hover:text-blue-500 transition-colors duration-200" />
                ) : (
                  <EyeOff className="w-5 h-5 text-gray-500 hover:text-blue-500 transition-colors duration-200" />
                )}
              </button>
            </div>
          </div>

          <Gendercheckbox/>

          <a className='text-sm hover:underline hover:text-blue-600 mt-4 inline-block' href='#'>
            Already have an account?
          </a>

          <div>
            <button className='btn btn-block btn-sm mt-2 border border-slate-700'>Sign Up</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
