import React from 'react';
import { Navigate } from "react-router-dom";
import { APP_ROUTES } from '../Utils/constants';

const ProtectedRoute = ({children}) => {
    const authenticated = false;
    if(!authenticated) {
        return <Navigate to={APP_ROUTES.SIGN_IN} />;
    }
    return children;
}
 
export default ProtectedRoute;