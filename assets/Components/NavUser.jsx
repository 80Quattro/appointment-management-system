import React, { useContext } from 'react';
import Nav from 'react-bootstrap/Nav';
import { UserContext } from '../Contexts/UserContext';
import { LinkContainer } from 'react-router-bootstrap'
import { APP_ROUTES } from '../Utils/constants';

const NavUser = () => {

    const {onLogOut} = useContext(UserContext);

    return ( 
        <Nav className="me-auto">
            <LinkContainer to={APP_ROUTES.HOME}>
                <Nav.Link>Appointments</Nav.Link>
            </LinkContainer>
            <LinkContainer to={APP_ROUTES.PROFILE}>
                <Nav.Link>Profile</Nav.Link>
            </LinkContainer>
            <Nav.Link onClick={onLogOut}>Log out</Nav.Link>
        </Nav>
     );
}
 
export default NavUser;