import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import { LinkContainer } from 'react-router-bootstrap'
import { APP_ROUTES } from '../Utils/constants';
import { UserContext } from '../Contexts/UserContext';

import NavGuest from './NavGuest';
import NavUser from './NavUser';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

const MainNavbar = () => {

    const {isLoggedIn} = useContext(UserContext);

    return (
        <Navbar expand="lg">
            <Container>
                
                <LinkContainer to={APP_ROUTES.HOME}>
                    <Navbar.Brand>Appointment Management System</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    {isLoggedIn ? <NavUser /> : <NavGuest />}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
 
export default MainNavbar;