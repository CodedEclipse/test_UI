import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import Layout from '../main/users/comman_componants/leyout/Layout';
const User_Login = lazy(() => import('../main/users/main_componants/auth/UserLogin'));
const Dashboard = lazy(() => import('../main/users/main_componants/dashbord/Dashbord'));
const Products = lazy(() => import('../main/users/main_componants/Products/Products'));


function UsersRoutes() {
    return (
        <Routes>
            <Route path="/login" element={<User_Login />} />
            <Route element={<Layout />}>
                <Route index element={
                    <Suspense fallback={<div>Loading...</div>}>
                        <Dashboard />
                    </Suspense>
                } />
                <Route path='/Products-list' element={
                    <Suspense fallback={<div>Loading...</div>}>
                        <Products />
                    </Suspense>
                } />
            </Route>
        </Routes>
    )
}

export default UsersRoutes;