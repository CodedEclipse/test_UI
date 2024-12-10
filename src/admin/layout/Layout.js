import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import '../assets/css/style.css'

function Layout() {
    const [isSidebarVisible, setSidebarVisible] = useState(true);

    const toggleSidebar = () => {
        setSidebarVisible(prevState => !prevState);
    };
    return (
        
        <div className={isSidebarVisible ? 'wrapper' : 'toggle-sidebar'}>
            <Header toggleSidebar={toggleSidebar} />
            <Sidebar />
            <div className="main" id="main"  >  
                <Outlet />
            </div>
                <Footer />
        </div>
    );
}

export default Layout;