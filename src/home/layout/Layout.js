import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';

function Layout() {
    return (
        <div className="wrapper">
            <Header />
            <Sidebar /> 
            <div className="content-page sb-margin-zero-mob">
                <Outlet />
                <Footer />
            </div>            
        </div>
    );
}

export default Layout;