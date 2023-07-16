import { useState } from "react";
import { Form, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './signup-view.scss';

export const SignupView = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");
    const [isRegistered, setIsRegistered] = useState(false);

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
            },
        }).then((response) => {
            if (response.ok) {
                alert("Signup successful!");
                window.location.reload();
            } else {
                alert("Signup failed");
            }
        });
    };

    return (
        <>
            <Card className="card mb-4">
                <Card.Body>
                    <Card.Title className="text-center mt-2 mb-1">Register with myFlix</Card.Title>
                        <Form onSubmit={handleSubmit} className="mb-4">
                            <Form.Group controlId="signupUsername">
                                <Form.Label></Form.Label>
                                <Form.Control type="text" 
                                    size="sm"
                                    value={username}
                                    placeholder="Enter new username"
                                    onChange={(e) => setUsername(e.target.value)}
                                    required>
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId="signupPassword">
                                <Form.Label></Form.Label>
                                <Form.Control type="password"
                                    size="sm"
                                    placeholder="Enter new password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required>
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId="signupEmail">
                                <Form.Label></Form.Label>
                                <Form.Control type="email"
                                    size="sm"
                                    placeholder="Enter valid email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required>
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId="signupBirthday">
                            <Form.Label></Form.Label>
                            <Form.Control type="date"
                                size="sm"
                                value={birthday}
                                onChange={(e) => setBirthday(e.target.value)}
                                required>
                            </Form.Control>
                        </Form.Group>

                        <Button variant="primary" size="sm" type="submit" className="mt-4">Register</Button>
                    </Form>
                    <Link to="/login" className="mt-2">
                        Already registered? Log in here.
                    </Link>
                </Card.Body>
            </Card>

        </>
    );
};