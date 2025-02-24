import React from 'react';
import Login from './pages/login/Login';
import SignUp from './pages/signup/SignUp';
import Home from './pages/home/Home';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuthContext } from './context/AuhContext';
import { Toaster } from 'react-hot-toast';

const App = () => {
  const { authUser } = useAuthContext();
  
  return (
    <div className='p-4 h-screen flex items-center justify-center'>
      <Routes>
        <Route path='/' element={!authUser ? <Navigate to="/login" /> : <Home />} />
        <Route path='/login' element={authUser ? <Navigate to="/" /> : <Login />} />
        <Route path='/signup' element={authUser ? <Navigate to="/" /> : <SignUp />} />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;

// import React from 'react'
// import Login from './pages/login/Login'
// import SignUp from './pages/signup/SignUp'
// import Home from './pages/home/Home'
// import { Route, Routes } from 'react-router-dom'
// import {Toaster} from 'react-hot-toast'

// const App = () => {
//   return (
//     <div className='p-4 h-screen flex items-center justify-center'>
//       <Routes>
//         <Route path='/' element={<Home/>}/>
//         <Route path='/login' element={<Login/>}/>
//         <Route path='/signup' element={<SignUp/>}/>
//       </Routes>
//       <Toaster/>
//     </div>
//   )
// }

// export default App

