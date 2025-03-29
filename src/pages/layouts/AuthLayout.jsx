import React from 'react';
import { Outlet } from 'react-router';
import wall from "../../assets/login-wall.jpg"

const AuthLayout = () => {
    return (

    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Left Section */}
      <div className="w-full md:w-1/2 bg-white flex flex-col justify-center items-center p-10">
        <div className="max-w-sm w-full text-center">
          
          
          <Outlet />
        </div>
      </div>

      {/* Right Section (Hidden on md and below) */}
      <div className="hidden md:flex w-1/2 bg-green-100 justify-center items-center relative">
        <img src={wall} alt="Illustration" className="absolute w-full h-full object-cover" />
      </div>
    </div>
    );
}

export default AuthLayout;

