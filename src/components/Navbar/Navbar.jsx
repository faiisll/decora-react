import React, { useEffect, useState } from 'react'
import Logo from "../../assets/logo-text.png"
import { TbSmartHome, TbLayoutGrid, TbSubtask, TbUsersGroup, TbLogout2, TbLayoutSidebarLeftExpandFilled, TbLayoutSidebarLeftCollapseFilled } from "react-icons/tb";
import Menus from './Menus';
import MenuItem from './MenuItem';
import MiniProfile from './MiniProfile';
import { useDispatch } from 'react-redux'
import {setAuth} from "../../store/authSlice"
import { useLocation } from 'react-router';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'motion/react';

export default function Navbar({scrolled = false}) {
    const dispatch = useDispatch()
    let location = useLocation();
    const menuData = [
        {
            id: 1,
            name: "Home",
            path: "/dashboard",
            icon: TbSmartHome
        },{
            id: 2,
            name: "Project",
            path: "/project",
            icon: TbLayoutGrid
        },{
            id: 3,
            name: "Task",
            path: "/task",
            icon: TbSubtask
        },{
            id: 4,
            name: "Teams",
            path: "/teams",
            icon: TbUsersGroup
        },
    ]

    const [isExpand, setExpand] = useState(false)
    


    return (
        <>
            {/* trigger */}
            <div className={clsx('w-full flex justify-between fixed  z-50 block lg:hidden px-4 py-4 transition-all duration-300', scrolled && "bg-white shadow")}>
                <TbLayoutSidebarLeftExpandFilled className='cursor-pointer text-gray-500 hover:text-gray-950' style={{fontSize: '28px'}} onClick={() => {setExpand(true)}} />
                <img src={Logo} width="100px" />
            </div>

            {/* backdrop */}

            <AnimatePresence>
                {isExpand && (
                    <motion.div
                    initial={{opacity:0}}
                    animate={{opacity: 0.5}}
                    exit={{opacity: 0, transition: {delay: 0.2}}}
                    transition={{duration: 0.2, ease: 'easeOut'}}
                    className='z-50 fixed w-screen h-screen bg-black lg:hidden'
                    onClick={() => {setExpand(false)}}>

                    </motion.div>
                )}

            </AnimatePresence>
            
            {/* navbar */}
            <div className={`z-50 w-[280px] lg:block hidden fixed lg:-translate-x-0 lg:static overflow-y-auto`}>
                <div className='w-full h-dvh border-r-2 border-gray-200 px-8 py-[50px] bg-white flex flex-col justify-between min-h-[600px]'>
                    <div className='flex flex-col'>
                        <div className='w-full mb-14 flex justify-between items-center'>
                            <img src={Logo} width="150px" />
                            <TbLayoutSidebarLeftCollapseFilled onClick={() => {setExpand(false)}} className='cursor-pointer text-gray-500 hover:text-gray-950 lg:hidden' style={{fontSize: '28px'}} />
                        </div>

                        <Menus datas={menuData} currentUrl={location.pathname} onClick={() => {setExpand(false)}} />
                    </div>

                    <div className='flex flex-col gap-4'>
                        <MiniProfile />
                        <MenuItem Icon={TbLogout2} name="Sign out" path="#" onClick={() => {dispatch(setAuth(false))}} />
                    </div>
                </div>

            </div>

            <AnimatePresence>
                { isExpand && <motion.div
                initial={{x: "-270px", transition: {delay: 0.2}}}
                animate={{x: 0, }}
                exit={{x: "-270px"}}
                transition={{duration: 0.2, ease: 'easeInOut'}}
                className={`z-50 w-[280px] lg:hidden fixed lg:-translate-x-0 lg:static overflow-y-auto`}>
                    <div className='w-full h-dvh border-r-2 border-gray-200 px-8 py-[50px] bg-white flex flex-col justify-between min-h-[600px]'>
                        <div className='flex flex-col'>
                            <div className='w-full mb-14 flex justify-between items-center'>
                                <img src={Logo} width="150px" />
                                <TbLayoutSidebarLeftCollapseFilled onClick={() => {setExpand(false)}} className='cursor-pointer text-gray-500 hover:text-gray-950 lg:hidden' style={{fontSize: '28px'}} />
                            </div>

                            <Menus datas={menuData} currentUrl={location.pathname} onClick={() => {setExpand(false)}} />
                        </div>

                        <div className='flex flex-col gap-4'>
                            <MiniProfile />
                            <MenuItem Icon={TbLogout2} name="Sign out" path="#" onClick={() => {dispatch(setAuth(false))}} />
                        </div>
                    </div>

                </motion.div>}

            </AnimatePresence>
        </>
    )
}
