
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Button, Card, Container, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./movie-card.scss";

export const MovieCard = ({ movie}) => {
    // const storedToken = localStorage.getItem("token");
    // const [token] = useState(storedToken || null);

    // const [favouriteMovies, setFavoriteMovies] = useState([]);
    // const getUser = (token) => {
    //     fetch(`https://movieflix-899d9c6c8969.herokuapp.com/users/${user.Username}`, {
    //         method: "GET",
    //         headers: { Authorization: `Bearer ${token}`},
    //     })
    //     .then((response) => response.json())
    //     .then((response) => {
    //         setFavoriteMovies(response.favouriteMovies);
    //     });
    // };

    // useEffect(() => {
    //     getUser(token);
    // }, []);

    // const addToFavorites = (movieId) => {
    //     fetch(
    //         `https://movieflix-899d9c6c8969.herokuapp.com/users/${user.Username}/movies/${movieId}`,
    //         {
    //         method: "POST",
    //         headers: {
    //             Authorization: `Bearer ${token}`,
    //             "Content-Type": "application/json",
    //         },
    //         }
    //     ).then((response) => {
    //         if (response.ok) {
    //         window.location.reload();
    //         } else {
    //         alert("Something went wrong");
    //         }
    //     });
    // };
    
    // const removeFromFavorites = (movieId) => {
    //     fetch(
    //         `https://myflix-api-1234.herokuapp.com/users/${user.Username}/movies/${movieId}`,
    //         {
    //         method: "DELETE",
    //         headers: {
    //             Authorization: `Bearer ${token}`,
    //             "Content-Type": "application/json",
    //         },
    //         }
    //     ).then((response) => {
    //         if (response.ok) {
    //         window.location.reload();
    //         } else {
    //         alert("Something went wrong");
    //         }
    //     });
    // };

    // const myFavourite = favouriteMovies.find((f) => f.Title === movie.Title);

    return ( 
        <Container>
            <Col>
                <Card border="light" className="h-100 bg-opacity-75 shadow" bd="dark" text="dark" >
                    <Card.Img variant="top" src={movie.ImageURL}/>
                    <Card.Body className="d-flex flex-column">
                        <Card.Title>{movie.Title}</Card.Title>
                        {/* <Card.Text className="text-muted">{movie.Description}</Card.Text> */}
                        <Card.Text>Rating: {movie.Rating}</Card.Text>
                    </Card.Body>
                    <Card.Footer className="d-flex flex-row justify-content-between align-items-baseline mt-auto">
                        <Link to={`/movies/${encodeURIComponent(movie._id)}`} className="text-start">
                            <Button className="button-primary">Open</Button>
                        </Link>
                        {/* {myFavorite ? (
                            <Button variant="btn-secondary">
                                <AiFillHeart
                                    onClick={() => removeFromFavorites(movie._id)}
                                    color="red"
                                    fontSize="2em"
                                />
                            </Button>
                        ) : (
                            <Button variant="btn-secondary">
                                <AiOutlineHeart
                                    onClick={() => addToFavorites(movie._id)}
                                    color="gray"
                                    fontSize="2em"
                                />
                            </Button>
                        )} */}
                    </Card.Footer>
                </Card>
            </Col>
        </Container>
    );
};

MovieCard.propTypes = {
    movie: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        ImageURL: PropTypes.string.isRequired,
        Rating: PropTypes.string.isRequired,
        Genre: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Description: PropTypes.string.isRequired
        }),
        Director: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Bio: PropTypes.string.isRequired,
            Birth: PropTypes.string.isRequired
        })
    }).isRequired,
};
