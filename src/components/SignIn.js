import { useState } from "react";
import {Col, Row } from "react-bootstrap";
import Button from 'react-bootstrap/Button';

import Form from 'react-bootstrap/Form';
import { Link } from "react-router-dom";

const SignIn = () => {


    const [validated, setValidated] = useState(false);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();


    const submition = (event) => {

        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }

        setValidated(true);
    
        const data = {
            "email": email,
            "password": password
          }
    
        auth(data);
          
        
    };
 
    async function auth(data) {
        try {

            const requestAuth = await fetch("http://127.0.0.1:8000/api/users/auth", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            
            body: JSON.stringify(data)
            });

            if (requestAuth.status === 200) {
                const responseAuth = await requestAuth.json();
                localStorage.setItem("token", responseAuth.token);
                window.location.href = "/";
            } else {
                const responseAuth = await requestAuth.json();
                alert(responseAuth.message);
            }
            
        } catch (error) {
            //console.log(error);
        }
    }
    return (
        <Row className="justify-content-md-center mt-5 mx-3 ">
            <Col sm={4}>
            <Form onSubmit={submition} noValidate validated={validated} className="border px-5 py-3">
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control required onChange={(e) => setEmail(e.target.value)}  type="email"/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control required onChange={(e) => setPassword(e.target.value)}  type="password"/>
                </Form.Group>
                <Row><Button type="submit" variant="primary" size="lg">LOGIN</Button></Row>
                <Row><Link to={"/register"}>Have Not Account</Link></Row>
            </Form>
            </Col>
        </Row>
    )
}
export default SignIn;