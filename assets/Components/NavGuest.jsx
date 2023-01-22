import React from 'react';
import Nav from 'react-bootstrap/Nav';
import { LinkContainer } from 'react-router-bootstrap'
import { APP_ROUTES } from '../Utils/constants';

const NavGuest = () => {
    return ( 
        <Nav className="me-auto">
            <LinkContainer to={APP_ROUTES.SIGN_IN}>
                <Nav.Link>Sign In</Nav.Link>
            </LinkContainer>
            <LinkContainer to={APP_ROUTES.SIGN_UP}>
                <Nav.Link>Sign Up</Nav.Link>
            </LinkContainer>
        </Nav>
     );
}
 
export default NavGuest;