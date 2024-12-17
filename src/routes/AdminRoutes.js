import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { PageLoader } from '../Loader';


const HomeLayout = lazy(() => import('../admin/layout/Layout'));
const Dashboard = lazy(() => import('../admin/componants/Dashbord'));
const Login = lazy(() => import('../admin/componants/authorization/Login'));
const Register = lazy(() => import('../admin/componants/authorization/Register'));
const UsersList = lazy(() => import('../admin/componants/UserList'));
const CustomerList = lazy(() => import('../admin/componants/CustomerList'));


function HomeRoutes() {
    return (
        <Routes>
            <Route path='/login' element={<Login />}/>
            <Route path='/register' element={<Register />}/>
            <Route element={<HomeLayout />}>
                <Route index element={
                    <Suspense fallback={<PageLoader />}>
                        <Dashboard />
                    </Suspense>
                } />

                
                <Route path='/user-list' element={
                    <Suspense fallback={<PageLoader />}>
                        <UsersList />
                    </Suspense>
                } />
                <Route path='/customer-list' element={
                    <Suspense fallback={<PageLoader />}>
                        <CustomerList />
                    </Suspense>
                } />
               
            </Route>

        </Routes>
    )
}

export default HomeRoutes;