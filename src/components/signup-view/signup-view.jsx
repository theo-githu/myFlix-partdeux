import React from "react";
import { Form, Button } from 'react-bootstrap';
import { useState } from "react";

export const SignupView = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday
        };
      
        fetch("https://movieflix-899d9c6c8969.herokuapp.com/users", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
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
        <>
            <h1>Register</h1>
            <Form onSubmit={handleSubmit} className='my-3 text-white'>
                <Form.Group controlId="formUsername" className="mb-3">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                    type='text'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    pattern="[0-9a-zA-Z]{5,}"
                    placeholder="Username"
                    />
                </Form.Group>
                <Form.Group controlId="formPassword" className="mb-3">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Password"
                    />
                </Form.Group>
                <Form.Group controlId="formEmail" className="mb-3">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                    type='email'
                    placeholder='Enter a valid email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    />
                </Form.Group>
                <Form.Group controlId="formBirthday" className="mb-3">
                    <Form.Label>Birthday:</Form.Label>
                    <Form.Control
                    type='date'
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                    required
                    />
                </Form.Group>
                <Button variant='primary' type='submit' className='mt-1'>Sign Up</Button>
            </Form>
        </>
    );
};