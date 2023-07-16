import React from "react";
import { Row, Col, Card } from "react-bootstrap";

import { MovieCard } from "../movie-card/movie-card";

export const FavouriteMovies = ({ user, favMovies }) => {
    
    const favouriteMovies = favMovies.map((movie) => {
        return {
            id: movie._id,
            title: movie.Title,
            image: movie.ImageURL,
            description: movie.Description,
            genre: movie.Genre,
            director: movie.Director
        };
    });

    if (favouriteMovies.length === 0) {
        return 
            <Col>You don't have any favourite movies!</Col>
    }

    return (
        <Card className="bg-light bg-opacity-75 mt-3">
            <Card.Title className="fw-bold fs-2">Your Favourite Movies</Card.Title>
            <Card.Body>
                <Row>
                    {favouriteMovies.map((movie) => (
                        <Col className="mb-3" key={movie._id} md={3}>
                            <MovieCard movie={movie} user={user} />
                        </Col>
                    ))}
                </Row>
            </Card.Body>
        </Card>
    );
};
