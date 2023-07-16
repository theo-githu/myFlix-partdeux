
import React, { useState } from "react";
import {Form, Button, Container, Row, Col, Card, CardGroup } from 'react-bootstrap';

import './login-view.scss';

export const LoginView = ({ onLoggedIn }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault(); //this prevents the default behaviour of the form which is to reload the entire page

        const data = {
            Username: username, 
            Password: password
        }; 

        fetch("https://movieflix-899d9c6c8969.herokuapp.com/login", { 
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then((response) => response.json())
        .then((data) => {
            console.log("Login response: ", data);
            if (data.user){
                localStorage.setItem("user", JSON.stringify(data.user));
                localStorage.setItem("token", data.token);
                onLoggedIn(data.user, data.token);
            } else {
                alert("No such user");
            }
        }) 
        .catch((e) => {
            alert("Something went wrong")
        });
    };

    return (
        <Container id="main-container">
            <Row>
                <Col>
                    <CardGroup>
                        <Card text="dark">
                            <Card.Body>
                                <Card.Title className="text-center mt-2 mb-1">Welcome to myFlix</Card.Title>
                                <Form onSubmit={handleSubmit} id="login-form" className="text-center text-white w-100">
                                    <Form.Group controlId="loginUsername" >
                                        <Form.Label>Username:</Form.Label>
                                        <Form.Control type="text" 
                                            size="sm"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            placeholder="Enter username"
                                            required>
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId="loginPassword" >
                                        <Form.Label>Password:</Form.Label>
                                        <Form.Control type="password"
                                            size="sm"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="Enter Password"
                                            required>
                                        </Form.Control>
                                    </Form.Group>

                                    <Button variant="primary" size="sm" type="submit" className="mt-4">Login</Button>
                                                        
                                </Form>
                            </Card.Body>
                        </Card>
                    </CardGroup>
                </Col>
            </Row>
        </Container>
    );
};
