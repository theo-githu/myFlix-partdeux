
import React, { useEffect, useState } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import "./movie-view.scss";

export const MovieView = ({ movies, user, favouriteMovies }) => {
    const storedToken = localStorage.getItem("token");
    const [token] = useState(storedToken ? storedToken : null);
    const { movieId } = useParams();
    const [isFavourite, setFavourite] = useState([]);


    const getUser = (token) => {
        fetch(`https://movieflix-899d9c6c8969.herokuapp.com/users/${user.Username}`, {
            method: "GET",
            headers: {Authorization: `Bearer ${token}`},
        })
        .then((response) => response.json())
        .then((response) => {
          console.log("Response: ", response);
        //   setFavoriteMovies(response.favoriteMovies);
        });
    };

    // useEffect(() => {
    //     const isFavourited = user.FavouriteMovies.includes(movieId)
        
    //     getUser(token);
    //   }, []);

    // const addToFavorites = (movieId) => {
    // fetch(
    //     `https://movieflix-899d9c6c8969.herokuapp.com/users/${user.Username}/movies/${movieId}`,
    //     {
    //     method: "POST",
    //     headers: {
    //         Authorization: `Bearer ${token}`,
    //         "Content-Type": "application/json",
    //     },
    //     }
    // ).then((response) => {
    //     if (response.ok) {
    //     window.location.reload();
    //     } else {
    //     alert("Something went wrong");
    //     }
    // });
    // };

    // const removeFromFavorites = (movieId) => {
    //     fetch(
    //       `https://movieflix-899d9c6c8969.herokuapp.com/users/${user.Username}/movies/${movieId}`,
    //       {
    //         method: "DELETE",
    //         headers: {
    //           Authorization: `Bearer ${token}`,
    //           "Content-Type": "application/json",
    //         },
    //       }
    //     ).then((response) => {
    //       if (response.ok) {
    //         window.location.reload();
    //       } else {
    //         alert("Something went wrong");
    //       }
    //     });
    //   };

        const movie = movies.find((m) => m._id === movieId);
        // const myFavourite = favouriteMovies.find((f) => f._id === movieId);

        // const similarMovies = movies.filter(
        //     (m) => m.genre.Name === movie.genre.Name && M !== movie
        // );

        return (

                    <Card>
                        <Card.Body>
                            <img src={movie.ImageURL} variant="top" className="w-100 text-centre"/>
                            <Card.Title className="fw-bold fs-2 mt-3 mb-3">
                                {movie.Title}
                            </Card.Title>
                            <Card.Text>
                                <span className="me-1 fw-bold">Description: </span>
                                <span>{movie.Description}</span>
                            </Card.Text>
                            <Card.Text>
                                <span className="me-1 fw-bold">Genre: </span>
                                <span>{movie.Genre.Name}</span>
                            </Card.Text>
                            <Card.Text>
                                <span className="me-1 fw-bold">Director: </span>
                                <span>{movie.Director.Name}</span>
                            </Card.Text>
                            <Card.Text>
                                <span className="me-1 fw-bold">IMDb Rating:  </span>
                                <span>{movie.Rating}</span>
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer className={"d-flex flex-row justify-content-between align-items-baseline mt-auto"}>
                            <Link to={`/`} className={"text-start"}>
                                <Button className="back-button" variant="primary" size="sm">Back</Button>
                            </Link>
                            {/* {myFavourite ? (
                                <Button variant="btn-secondary">
                                    <AiFillHeart 
                                        onClick={() => removeFromFavourites(movie._id)}
                                        color="red"
                                        fontSize="2em"
                                    />
                                </Button>
                            ) : (
                                <Button variant="btn-secondary">
                                    <AiOutlineHeart
                                        onClick={() => addToFavourites(movie._id)}
                                        color="gray"
                                        fontSize="2em"
                                    />
                                </Button>
                            )} */}
                        </Card.Footer>
                    </Card>

        );
 };
 
            
      
   