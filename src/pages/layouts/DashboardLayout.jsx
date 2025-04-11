// src/components/DashboardLayout.js
import React, { useEffect, useRef, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { Outlet } from 'react-router';

const DashboardLayout = () => {

    const [scrolled, setScrolled] = useState(false);
    const container = useRef(null);

    const [scrolltopdata, setscrolltopdata] = useState('');

    const handleScroll = () => {
      if (container.current.scrollTop > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    useEffect(() => {
      const element = container.current;
      element.addEventListener('scroll', handleScroll);
  
      return () => {
        element.removeEventListener('scroll', handleScroll);
      };
    }, []);

  return (
    <div className="w-screen h-dvh flex max-h-screen overflow-hidden font-poppins">
        <Navbar scrolled={scrolled} />
        <div ref={container} className='grow overflow-y-auto pt-14 lg:py-4 lg:px-4 px-4 lg:pt-4'>
          <Outlet />
        </div>
    </div>
  );
};

export default DashboardLayout;
