import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';

function Layout() {
    return (
        <>
        <body>  
        <Header />
            {/* <Sidebar />  */}
            {/* <div className="content-page sb-margin-zero-mob"> */}
            <Outlet />
            <footer>
                <Footer />
            </footer>
            {/* </div>             */}
        </body>
           
        </>

    );
}

export default Layout;