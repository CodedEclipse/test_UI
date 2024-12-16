import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { PageLoader } from '../Loader';


const HomeLayout = lazy(() => import('../home/layout/Layout'));
const HomePage = lazy(() => import('../home/componants/HomePage'));
const Register = lazy(() => import('../home/componants/Registration'));


function HomeRoutes() {
    return (
        <Routes>
            <Route element={<HomeLayout />}>
                <Route index element={
                    <Suspense fallback={<PageLoader />}>
                        <HomePage />
                    </Suspense>
                } />
                <Route path='/register-user' element={
                    <Suspense fallback={<PageLoader />}>
                        <Register />
                    </Suspense>
                } />
               
            </Route>

        </Routes>
    )
}

export default HomeRoutes;