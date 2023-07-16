
import React, { useState } from 'react'; 

import { Form, Button } from 'react-bootstrap';

export const ProfileView = ({ onLoggedIn }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        const data ={
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday
        };

        fetch(`https://movieflix-899d9c6c8969.herokuapp.com/users`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json"}
        }).then((response) => {
            if (response.ok) {
                alert("Signup successful");
                window.location.reload();
              } else {
                alert("Signup failed");
              }
        });
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="SignupformUsername">
                <Form.Label>Username:</Form.Label>
                <Form.Control
                    type="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    minLength="5"
                />
            </Form.Group>
    
            <Form.Group controlId="SignupformPassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </Form.Group>
    
            <Form.Group controlId="SignupformEmail">
                <Form.Label>Email:</Form.Label>
                <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </Form.Group>
    
            <Form.Group controlId="SignupformBirthday">
                <Form.Label>Birthday:</Form.Label>
                <Form.Control
                    type="date"
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                    required
                />
            </Form.Group>
            <Button className= "mt-3" variant="primary" type="submit">
            Sign Up
            </Button>
        </Form>
    );
};