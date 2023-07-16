import { useState, useEffect } from "react";
import react from "react";
import { Button, Col, Row, Form } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { MovieCard } from "../movie-card/movie-card";
import { ModalHeader } from "react-bootstrap";


export const ProfileView = ({ user, token, movies, setUser, onLoggedOut }) => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");
    const [showModal, setShowModal] = useState(false);
    const favouriteMovies = movies.filter((movie) => {
        return user.FavoriteMovies.includes(movie._id)
    });
    
    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday
        };

        fetch(`https://movieflix-899d9c6c8969.herokuapp.com/users/${user.username}`, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                alert("Changing user data failed");
            }
        })
        .then((data) => {
            localStorage.setItem("user", JSON.stringify(data));
            setUser(data);
        })
        .catch(e => {
            alert(e);
        });
    }

    const handleDeleteUser = () => {

        fetch(`https://movieflix-899d9c6c8969.herokuapp.com/users/${user.username}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(response => {
            if (response.ok) {
                alert("Your account has been deleted. Good Bye!");
                onLoggedOut();
            } else {
                alert("Could not delete account");
            }
        })
        .catch(e => {
            alert(e);
        });
    }

    // let favoriteMovies = movies.filter(movie => user.FavoriteMovies.includes(movie._id));

    return (
        <>
        <h1 className="text-white">Profile</h1>
        <Row>
            <Col className="text-white">
                <h3 className="text-white">Your profile details</h3>
                <div>Username: {user.Username}</div>
                <div>Email: {user.Email}</div>
            </Col>
            <Col>
            <h3 className="text-white">Update your profile information</h3>
            <Form onSubmit={handleSubmit} className="text-white">
                <Form.Group controlId="formUsername">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        minLength="5" 
                    />
                </Form.Group>
                <Form.Group controlId="formPassword">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength="5"
                    />
                </Form.Group>
                <Form.Group controlId="formEmail">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formBirthday">
                    <Form.Label>Birthday:</Form.Label>
                    <Form.Control
                        type="date"
                        value={birthday}
                        onChange={(e) => setBirthday(e.target.value)}
                        required
                    />
                </Form.Group>
                <Button variant="primary" type="submit">Save changes</Button>
            </Form>
            </Col>
        </Row>
        <Row className="text-white">
            <h3>Favorite movies:</h3>
            {favoriteMovies.map((movie) => (
                <Col className="mb-5" key={movie._id} md={4}>
                    <MovieCard movie={movie}></MovieCard>
                </Col>
            ))}
        </Row>
        <Button variant="primary" onClick={handleShowModal}>
            Delete my account
        </Button>
        <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
                <Modal.Title>Delete account</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete your account permanantly?</Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleDeleteUser}>Yes</Button>
                <Button variant="secondary" onClick={handleCloseModal}>No</Button>
            </Modal.Footer>
        </Modal>
        </>
    )
}