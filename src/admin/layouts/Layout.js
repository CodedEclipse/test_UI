import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
// import '../assets/css/style.css'

function Layout() {
    const [isSidebarVisible, setSidebarVisible] = useState(true);

    const toggleSidebar = () => {
        setSidebarVisible(prevState => !prevState);
    };
    return (
        <>
            <div className="layout-wrapper layout-content-navbar">
                <div className="layout-container">
                        <Sidebar />
                    <div className="layout-page">
                    <Header />
                        <Outlet />
                    <Footer />

                    </div>
                </div>
            </div>
        </>
    );
}

export default Layout;