import React, { StrictMode, useContext, useEffect } from 'react';
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { APP_ROUTES } from './Utils/constants';
  
import Appointments from './Pages/Appointments';
import Login from './Pages/Login';
import Register from './Pages/Register';
import ProtectedRoute from './Components/ProtectedRoute';
import MainNavbar from './Components/MainNavbar';

import { UserContext, UserProvider } from './Contexts/UserContext';

import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {

    const {checkIfLoggedIn} = useContext(UserContext);

    // On startup check if auth token is stored from last session
    useEffect(() => {
        checkIfLoggedIn();
    }, []);

    return (
        <BrowserRouter>
            <MainNavbar />
            <Container>
                <Routes>
                    <Route 
                        path={APP_ROUTES.HOME} 
                        element={ <ProtectedRoute> <Appointments /> </ProtectedRoute> } 
                    />
                    <Route path={APP_ROUTES.SIGN_IN} element={<Login />} />
                    <Route path={APP_ROUTES.SIGN_UP} element={<Register />} />
                </Routes>
            </Container>
        </BrowserRouter>
    );
}

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
    <StrictMode>
        <UserProvider>
            <App />
        </UserProvider>
    </StrictMode>
  );