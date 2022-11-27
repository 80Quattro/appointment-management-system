import React from 'react';
import { Link } from "react-router-dom";
import { LinkContainer } from 'react-router-bootstrap'
import { APP_ROUTES } from '../Utils/constants';

import NavGuest from './NavGuest';
import NavUser from './NavUser';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

const MainNavbar = () => {
    return (
        <Navbar expand="lg">
            <Container>
                
                <LinkContainer to={APP_ROUTES.HOME}>
                    <Navbar.Brand>Appointment Management System</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <NavGuest />
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
 
export default MainNavbar;