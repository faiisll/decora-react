// src/components/DashboardLayout.js
import React, { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { Outlet } from 'react-router';

const DashboardLayout = () => {

  return (
    <div className="w-screen h-screen flex max-h-screen overflow-hidden font-poppins">
        <Navbar />
        <div className='grow overflow-y-auto pt-10 lg:py-4 lg:px-4 px-4'>
          <Outlet />
        </div>
    </div>
  );
};

export default DashboardLayout;
