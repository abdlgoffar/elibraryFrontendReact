import { useState } from "react";
import {Col, Row } from "react-bootstrap";
import Button from 'react-bootstrap/Button';

import Form from 'react-bootstrap/Form';
import { Link } from "react-router-dom";

const SignUp = () => {


    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [name, setName] = useState();
    const [validated, setValidated] = useState(false);


    const submition = (event) => {

        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }

        setValidated(true);
    

        const data = {
            "name": name,
            "email": email,
            "role": "USER",
            "password":password
        }
        register(data);
        
    };
  
    async function register(data) {
        try {
            const requestUserRegister = await fetch("http://127.0.0.1:8000/api/users/signup", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
            });

            if (requestUserRegister.status === 200) {
                alert("REGISTRASI BERHASIL")
                window.location.href = "/login";
            } else if (requestUserRegister.status === 403) {
                const responseUserRegister = await requestUserRegister.json();
                alert(responseUserRegister.message);
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
                    <Form.Label>Name</Form.Label>
                    <Form.Control required onChange={(e) => setName(e.target.value)}  type="text"/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control required onChange={(e) => setEmail(e.target.value)}  type="email"/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control required onChange={(e) => setPassword(e.target.value)}  type="password"/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Link to={"/login"}>Have Account</Link>
                </Form.Group>
                <Row><Button type="submit" variant="primary" size="lg">REGISTER</Button></Row>
            </Form>
            </Col>
        </Row>
    )
}
export default SignUp;