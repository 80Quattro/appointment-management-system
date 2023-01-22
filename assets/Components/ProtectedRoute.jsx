import React, { useContext } from 'react';
import { Navigate } from "react-router-dom";
import { APP_ROUTES } from '../Utils/constants';
import { UserContext } from '../Contexts/UserContext';

const ProtectedRoute = ({children}) => {
    const {isLoggedIn} = useContext(UserContext);
    if(!isLoggedIn) {
        return <Navigate to={APP_ROUTES.SIGN_IN} />;
    }
    return children;
}
 
export default ProtectedRoute;