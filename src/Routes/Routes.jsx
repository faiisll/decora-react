import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router'
import AdminLayout from "../pages/layouts/AuthLayout"
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import DashboardLayout from '../pages/layouts/DashboardLayout';
import Dashboard from '../pages/Dashboard/Dashboard';
import { useSelector, useDispatch } from 'react-redux'
import Project from '../pages/Project/Project';
import Taks from '../pages/Taks/Taks';
import Team from '../pages/Team/Team';
import { useLocation } from 'react-router';
import {AnimatePresence} from "motion/react"
import ProjectDetail from '../pages/Project/ProjectDetail';
import NewProject from '../pages/Project/NewProject';
import Invitation from '../pages/Auth/Invitation';
import { setAuth } from '../store/authSlice';
import { setUserOnline } from '../store/teamSlice';
import { useGetUserMutation } from '../store/apis/authApi';
import FullScreenLoader from '../components/Loading/FullscreenLoader';
import socketClient from '../socket/socketClient';
import { isEqual } from 'lodash';
const AllRoutes = () => {
    const location = useLocation();
    let isAuth = useSelector((state) => state.auth.isAuth)
    let usersOnline = useSelector((state) => state.team.usersOnline)
    let userData = useSelector((state) => state.auth.dataUser)
    const dispatch = useDispatch()
    const [getUser, {isLoading, isSuccess}] = useGetUserMutation()

    useEffect(() => {
        let token = localStorage.getItem('token')

        if(token){
            dispatch(setAuth(true))
        }
        if(!userData && token){
            getUser()
        }

    }, [])
    return (
        <AnimatePresence >
            <Routes location={location} key={location.pathname}>
                <Route element={!isAuth ? <AdminLayout /> : <Navigate to={"/dashboard"} />} path='/'>
                    <Route index element={<Navigate to={"/login"} />}/>
                    <Route path='login' element={<Login />}/>
                    <Route path='register' element={<Register />}/>
                    <Route path='invitation' element={<Invitation />}/>
                </Route>
                <Route element={<DashboardLayout loading={isLoading} user={userData} />} path='/'>
                    <Route index element={<Navigate to={"/dashboard"} />}/>
                    <Route path='dashboard' element={<Dashboard />}/>
                    <Route path='project' element={<Project />}/>
                    <Route path='project/:id' element={<ProjectDetail />}/>
                    <Route path='project/new' element={<NewProject />}/>
                    <Route path='task' element={<Taks />}/>
                    <Route path='teams' element={<Team />}/>
                </Route>
            </Routes>

        </AnimatePresence>
    );
}

export default AllRoutes;
