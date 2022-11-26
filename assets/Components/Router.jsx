import React from 'react';
import { createBrowserRouter } from "react-router-dom";
import { APP_ROUTES } from '../Utils/constants';
  
import Appointments from '../Pages/Appointments';
import Login from '../Pages/Login';
import Register from '../Pages/Register';

const router = createBrowserRouter([
    {
        path: APP_ROUTES.HOME,
        element: <Appointments />,
    },
    {
        path: APP_ROUTES.SIGN_IN,
        element: <Login />
    },
    {
        path: APP_ROUTES.SIGN_UP,
        element: <Register />
    }
]);

export default router;