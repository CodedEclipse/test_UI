import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { PageLoader } from '../Loader';


const HomeLayout = lazy(() => import('../home/layout/Layout'));


function HomeRoutes() {
    return (
        <Routes>
            <Route element={<HomeLayout />}>
                <Route index element={
                    <Suspense fallback={<PageLoader />}>
                        {/* <Home /> */}
                    </Suspense>
                } />

                
                {/* <Route path='/login' element={
                    <Suspense fallback={<PageLoader />}>
                        <Login />
                    </Suspense>
                } /> */}
               
            </Route>

        </Routes>
    )
}

export default HomeRoutes;