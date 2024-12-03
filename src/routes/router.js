import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useRoutes } from 'react-router-dom';

import HomePage from '../views/HomePage';
const routes = [
    {
        path: '/',
        element: <HomePage />
    },

];
export default routes;