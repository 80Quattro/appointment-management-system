import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { login } from '../Services/AuthService';
import { UserContext } from '../Contexts/UserContext';
import { APP_ROUTES } from '../Utils/constants';

const Login = () => {

    const {onLogin, isLoggedIn} = useContext(UserContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [validated, setValidated] = useState(false);

    const navigate = useNavigate();

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
            login(email, password).then(response => {
                // TODO: what if false ???
                onLogin(response.token);
                navigate(APP_ROUTES.HOME);
            })
        }

        setValidated(true);
    };


    return (
        <Row><Col></Col><Col>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                    <Form.Control.Feedback type="invalid">Please provide a valid email address.</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Log in
                </Button>
            </Form>
        </Col></Row>
     );
}
 
export default Login;