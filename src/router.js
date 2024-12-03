import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useRoutes } from 'react-router-dom';

import HomePage from './views/HomePage';
import AboutPageTokio from './views/AboutPageTokio';
import NotFoundPage from './views/NotFoundPage';
import CoursePage from './views/CoursePage';
import DetailCoursePage from './views/DetailCoursePage';
import DetailCourseTypePage from './views/DetailCourseTypePage';
import AddCoursePage from './views/AddCoursePage';
import AccountPage from './views/AccountPage';
import UserRouter from './routes/user-router';
import AboutPage from './views/AboutPage';
import routes from './routes/router';

const renderRoutes = (routesArray) => {
    if (!Array.isArray(routesArray)) {
        console.error('Expected routesArray to be an array but got', typeof routesArray);
        return null;
    }

    return routesArray.map((route, index) => {
        if (route.children && Array.isArray(route.children)) {
            return (
                < Route key={index} path={route.path} element={route.element} >
                    {renderRoutes(route.children)
                    }  { }
                </Route >
            );
        } else {
            return <Route key={index} path={route.path} element={route.element} />;
        }
    });
};

const AppRouter = () => {
    const element = useRoutes(routes)
    return element;
};

export default AppRouter;