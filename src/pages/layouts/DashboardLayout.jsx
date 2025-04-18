// src/components/DashboardLayout.js
import React, { useEffect, useRef, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { Outlet, useLocation, useNavigate, replace } from 'react-router';
import { AnimatePresence, motion } from 'motion/react';
import FullScreenLoader from '../../components/Loading/FullscreenLoader';

const DashboardLayout = ({loading = false, user = null}) => {

    const [scrolled, setScrolled] = useState(false);
    const container = useRef(null);
    const location = useLocation()
    const navigate = useNavigate()

    const handleScroll = () => {
      if (container.current.scrollTop > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    useEffect(() => {
      const element = container.current;

      const token = localStorage.getItem('token')

      if(!token){
        navigate('/login', {replace: true})
      }

      if(element){
        element.addEventListener('scroll', handleScroll);
    
        return () => {
          element.removeEventListener('scroll', handleScroll);
        };

      }
    }, []);

    const pageVariants = {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 }
    };

    if(loading){
      return <FullScreenLoader isLoading={loading} />
    }
  return (
    <div className="w-screen h-dvh flex max-h-screen overflow-hidden font-poppins">
        <Navbar scrolled={scrolled} user={user} />
        <div ref={container} className='grow overflow-y-auto pt-14 lg:py-4 lg:px-4 px-4 lg:pt-4'>
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
        </div>
    </div>
  );
};

export default DashboardLayout;
