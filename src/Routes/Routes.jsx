import React, { useState } from 'react';
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
const AllRoutes = () => {
    const location = useLocation();
    let isAuth = useSelector((state) => state.auth.isAuth)
    return (
        <AnimatePresence >
            <Routes location={location} key={location.pathname}>
                <Route element={!isAuth ? <AdminLayout /> : <Navigate to={"/dashboard"} />} path='/'>
                    <Route index element={<Navigate to={"/login"} />}/>
                    <Route path='login' element={<Login />}/>
                    <Route path='register' element={<Register />}/>
                    <Route path='invitation' element={<Invitation />}/>
                </Route>
                <Route element={isAuth ? <DashboardLayout /> : <Navigate to={"/login"} />} path='/'>
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
