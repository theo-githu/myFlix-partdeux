
import React, { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import { useParams } from "react-router";
import { Link } from "react-router-dom";


export const MovieView = ({ movies, username, favouriteMovies }) => {
    const { movieId } = useParams();
    const storedToken = localStorage.getItem("token");
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const movie = movies.find((m) => m._id === movieId);
    const [movieExists, setMovieExists] = useState(false);
    const [userFavouriteMovies, setUserFavouriteMovies] = useState(storedUser.FavoriteMovies ? storedUser.FavoriteMovies: favoriteMovies);

    console.log(username)

    // Add FavMovie
    const addFavouriteMovie = async() => {
        const favoriteMovie = await fetch(`https://movieflix-899d9c6c8969.herokuapp.com/users/${user.Username}/movies/${movieId}`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${storedToken}`,
                "Content-Type": "application/json", 
            }
        })

        console.log(storedToken)

        const response = await favoriteMovie.json()
        setUserFavoriteMovies(response.FavoriteMovies)
        if (response) {
        alert("Movie added to favorites");
        localStorage.setItem("user", JSON.stringify (response))
        window.location.reload(); 
        } else {
        alert("Something went wrong");
        }    
    }

    const removeFavoriteMovie = async() => {
        const favoriteMovie = await fetch (`https://movieflix-899d9c6c8969.herokuapp.com/users/${username}/movies/${movieId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${storedToken}`,
            "Content-Type": "application/json"
          }
        })     
        const response = await favoriteMovie.json()
        console.log(response)
        if (response) {
          alert("Movie removed from favorites");
          localStorage.setItem("user", JSON.stringify (response))
          window.location.reload(); 
        } else {
          alert("Something went wrong");
        }
    };

    const movieAdded = () => {
        const hasMovie = userFavoriteMovies.some((m) => m === movieId)
        console.log("userFavMov", userFavoriteMovies)
        console.log("movieId", movieId)
        if (hasMovie) {
          setMovieExists(true)
        }
    };
  
      const movieRemoved = () => {
        const hasMovie = userFavoriteMovies.some((m) => m === movieId)
        if (hasMovie) {
          setDisableRemove(false)
        }
    };

    console.log("movieExists", movieExists)

    useEffect (()=> {
        movieAdded()
        movieRemoved()
    },[])

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
                <br />
                <br/>
                <Button 
                    className="button-add-favorite"
                    onClick={addFavoriteMovie}
                    disabled={movieExists}
                    >
                    + Add to Favorites
                </Button>
                <br/>
                <br/>
                <Button 
                    variant="danger"
                    onClick={removeFavoriteMovie}
                    disabled={disableRemove}
                    >
                    Remove from Favorites
                </Button> 
            </Card.Footer>
        </Card>

    );
 };
 
            
      
   