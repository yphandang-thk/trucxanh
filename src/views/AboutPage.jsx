import React from 'react';
import { Outlet } from 'react-router-dom';
const AboutPage = () => {
    return (
        <div>
            <h1>About Page</h1>
            <Outlet />
        </div>
    );
};

export default AboutPage;