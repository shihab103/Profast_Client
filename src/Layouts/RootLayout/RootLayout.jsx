import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../../Pages/Home Page/Home/Shared/Navbar/Navbar';
import Footer from '../../Pages/Home Page/Home/Shared/Footer/Footer';

const RootLayout = () => {
    return (
        <div>
            <Navbar/>
            <Outlet/>
            <Footer/>
        </div>
    );
};

export default RootLayout;