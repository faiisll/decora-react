import React from 'react';
import { Navigate, Route, Routes } from 'react-router'
import AdminLayout from "../pages/layouts/AuthLayout"
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
const AllRoutes = () => {
    return (
        <Routes>
            <Route element={<AdminLayout />} path='/'>
                <Route index element={<Navigate to={"/login"} />}/>
                <Route path='login' element={<Login />}/>
                <Route path='register' element={<Register />}/>
            </Route>
        </Routes>
    );
}

export default AllRoutes;
