import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useRoutes } from 'react-router-dom';

import HomePage from '../views/HomePage';
import AboutPageTokio from '../views/AboutPageTokio';
import NotFoundPage from '../views/NotFoundPage';
import CoursePage from '../views/CoursePage';
import DetailCoursePage from '../views/DetailCoursePage';
import DetailCourseTypePage from '../views/DetailCourseTypePage';
import AddCoursePage from '../views/AddCoursePage';
import AccountPage from '../views/AccountPage';
import UserRouter from './user-router'
import AboutPage from '../views/AboutPage';
// const AboutPage = lazy(() => import('./../views/AboutPageTokio'));

const routes = [
    {
        path: '/',
        element: <HomePage />
    },
    {
        path: '/about',
        element: <AboutPage />,
        name: 'about'
        // children: [
        //     {
        //         path: 'tokio',
        //         element: <AboutPageTokio />
        //     }
        // ]
    },
    {
        path: '/about/tokio',
        element: <AboutPageTokio />
    },
    {
        path: 'course',
        element: <CoursePage />
    },

    {
        path: 'course/add',
        element: <AddCoursePage />
    },
    {
        path: 'course/:courseId',
        element: <DetailCoursePage />
    },
    {
        path: 'course/:courseId/:type',
        element: <DetailCourseTypePage />
    },
    {
        path: '/user/account',
        element: <UserRouter element={<AccountPage />} />
    },
    {
        path: '*',
        element: <NotFoundPage />
    }
];
export default routes;