import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';
import useLogin from '../../hooks/useLogin';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { loading, login } = useLogin(); // Add the parentheses here

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(username, password);
  };


  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
      <div className='w-full p-6 rounded-lg shadow-md bg-grey-400 bg-clip-padding backdrop-blur-lg backdrop-filter bg-opacity-0'>
        <h1 className='text-3xl text-center font-semibold text-gray-300'>Login
          <span className='text-blue-500 ml-2'>MontyChat</span>
        </h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>Username:</span>
            </label>
            <input 
              type="text" 
              placeholder="Enter Username" 
              className='w-full input input-bordered h-10'
              value={username}
              onChange={(e)=>setUsername(e.target.value)}
            />
          </div>

          <div>
            <label className='label'>
              <span className='text-base label-text'>Password:</span>
            </label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="Enter Password" 
                className='w-full input input-bordered h-10'
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
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

          <Link to="/signup" className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block'>
            {"Don't"} have an account?
          </Link>
          <div>
            <button className='btn btn-block btn-sm mt-2'
            disabled={loading}>{loading? <span className='loading loading-spinner'></span>:"Login"}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
