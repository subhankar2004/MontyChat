import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import Gendercheckbox from './Gendercheckbox';
import { Link } from 'react-router-dom';
import useSignup from '../../hooks/useSignUp';

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [input, setInput] = useState({
    fullName: "",
    userName: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const handleSubmit=async(e)=>{
    e.preventDefault();
    console.log(input);
    await signup(input);
  }

  const handleCheckboxChange = (gender) => {
    setInput({ ...input, gender: gender });
  };

  const {loading,signup}=useSignup();

 

  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
      <div className='w-full p-6 rounded-lg shadow-md bg-grey-400 bg-clip-padding backdrop-blur-lg backdrop-filter bg-opacity-0'>
        <h1 className='text-3xl text-center font-semibold text-gray-300'>SignUp
          <span className='text-blue-500 ml-2'>MontyChat</span>
        </h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>Full Name:</span>
            </label>
            <input type="text" placeholder="Enter Full Name" className='w-full input input-bordered h-10'
              value={input.fullName}
              onChange={(e) => setInput({ ...input, fullName: e.target.value })}
            />
          </div>
          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>Username:</span>
            </label>
            <input 
              type="text" 
              placeholder="Subhankar2004" 
              className='w-full input input-bordered h-10'
              value={input.userName}
              onChange={(e) => setInput({ ...input, userName: e.target.value })} // Changed from username to userName
            />
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
                value={input.password}
                onChange={(e)=>setInput({ ...input, password: e.target.value })}
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
                value={input.confirmPassword}
                onChange={(e)=>setInput({ ...input, confirmPassword: e.target.value })}
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

          <Gendercheckbox onCheckboxChange={handleCheckboxChange} selectedGender={input.gender}/>

          <Link className='text-sm hover:underline hover:text-blue-600 mt-4 inline-block' to='/login'>
            Already have an account?
          </Link>

          <div>
            <button className='btn btn-block btn-sm mt-2 border border-slate-700'
            disabled={loading}>
              {loading ? <span className='loading loading-spinner'></span>:"Sign Up"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
