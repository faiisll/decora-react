import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router';
import wall from "../../assets/login-wall.jpg"
import wall2 from "../../assets/login-wall2.jpg"
import wall3 from "../../assets/login-wall3.jpg"
import Logo from "../../assets/logo-text.png"
import AnimatePageFade from '../../components/Animate/AnimatePageFade';
import { AnimatePresence } from 'motion/react';

const AuthLayout = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [fade, setFade] = useState(true);
    const images = [
      wall,
      wall2,
      wall3
    ];

    useEffect(() => {
      const intervalId = setInterval(() => {
        setFade(false); // Start fade out
        setTimeout(() => {
          setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
          setFade(true); // Start fade in
        }, 500); // Wait 500ms for fade out to finish before changing image
      }, 5000); // Change image every 1 second
  
      // Cleanup the interval when the component is unmounted
      return () => clearInterval(intervalId);
    }, [images.length]);

    return (

    <div className="flex flex-col md:flex-row min-h-screen bg-white font-poppins">
      {/* Left Section */}
      <div className="w-full md:w-1/2 lg:w-3/4 bg-white flex flex-col justify-center items-center p-10">
        <div className="max-w-sm lg:max-w-md w-full text-center">
          <div className='w-full flex justify-center mb-10'>
            <img src={Logo} width="140px" />

          </div>
            <AnimatePageFade>
              <Outlet />

            </AnimatePageFade>
        </div>
      </div>

      {/* Right Section (Hidden on md and below) */}
      <div className="hidden md:flex w-1/2 bg-gray-200 justify-center items-center relative m-4 rounded-xl">
        <img src={images[currentImageIndex]} alt="Illustration"
        className={`absolute w-full h-full rounded-xl object-cover transition-opacity duration-500 ease-in-out ${fade ? 'opacity-100' : 'opacity-0'}`}
        />
      </div>
    </div>
    );
}

export default AuthLayout;

