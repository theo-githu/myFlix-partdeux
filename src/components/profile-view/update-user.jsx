
import React, {useState} from "react";
import { Row, Col, Form, Button, Card } from "react-bootstrap";

export const UpdateUser = ({ user }) => {
    const [storedToken] = localStorage.getItem("token");
    const [token] = useState(storedToken ? storedToken : null);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday
        };

        console.log(data);

        const updateUser = await
        fetch(`https://movieflix-899d9c6c8969.herokuapp.com/users/${user.Username}`, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        const response = await updateUser.json();
        console.log(response);

        if (response) {
            alert("User information updated successfully! Please login again.");
            localStorage.clear();
            window.location.reload();
        } else {
            alert("Something went wrong! Please try again.");
        }
    };

    return (
        <Row>
            <Col md={4}>
                <Card.Group>
                    <Card>
                        <Card.Body>
                            <>
                            <h3>Update User Profile</h3>
                            <Form onSubmit={(e) => handleSubmit(e)}>
                                <Form.Group className="mt-3">
                                    <Form.Label>Username:</Form.Label>
                                    <Form.Control>
                                        type='text'
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        placeholder='Enter your username'
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group className="mt-3">
                                    <Form.Label>Password:</Form.Label>
                                    <Form.Control>
                                        type='password'
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder='Create a password'
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group className="mt-3">
                                    <Form.Label>Email:</Form.Label>
                                    <Form.Control>
                                        type='email'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder='Enter your email'
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group className="mt-3">
                                    <Form.Label>Birthday:</Form.Label>
                                    <Form.Control>
                                        type='date'
                                        value={birthday}
                                        onChange={(e) => setBirthday(e.target.value)}
                                    </Form.Control>
                                </Form.Group>
                                <Button type="submit" variant="primary" className="mt-3">Save Changes</Button>
                            </Form>
                            </>
                        </Card.Body>
                    </Card>
                </Card.Group>
            </Col>
        </Row>
    );
};
