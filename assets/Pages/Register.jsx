import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { register } from '../Services/AuthService';
import { UserContext } from '../Contexts/UserContext';
import { APP_ROUTES } from '../Utils/constants';

const Register = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmed, setPasswordConfirmed] = useState('');

    const [validated, setValidated] = useState(false);
    let navigate = useNavigate();

    const {isLoggedIn} = useContext(UserContext);

    // if logged in -> redirect to home page
    useEffect(() => {
        if(isLoggedIn) {
            navigate(APP_ROUTES.HOME);
        }
    }, [isLoggedIn]);

    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();

        const form = event.currentTarget;
        if (form.checkValidity()) {
            register(email, password).then(response => {
                console.log(response);
                navigate(APP_ROUTES.SIGN_IN);
            })
        }

        setValidated(true);
    };

    return ( 
        <Row><Col></Col><Col>
            <Form noValidate validated={validated} onSubmit={handleSubmit} >
                <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                    <Form.Control.Feedback type="invalid">Please provide a valid email address.</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formPasswordConfirm">
                    <Form.Label>Confirm password</Form.Label>
                    <Form.Control type="password" placeholder="Confirm password" required value={passwordConfirmed} onChange={(e) => setPasswordConfirmed(e.target.value)} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Sign Up
                </Button>
            </Form>
        </Col></Row>
     );
}
 
export default Register;