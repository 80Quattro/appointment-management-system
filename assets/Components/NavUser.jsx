import React from 'react';
import Nav from 'react-bootstrap/Nav';
import { LinkContainer } from 'react-router-bootstrap'
import { APP_ROUTES } from '../Utils/constants';

const NavUser = () => {
    return ( 
        <Nav className="me-auto">
            <LinkContainer to={APP_ROUTES.HOME}>
                <Nav.Link>Appointments</Nav.Link>
            </LinkContainer>
            <Nav.Link>Log out</Nav.Link>
        </Nav>
     );
}
 
export default NavUser;