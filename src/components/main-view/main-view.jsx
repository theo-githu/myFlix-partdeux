import React from "react";
import { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap/Row";

import { MovieCard } from "./movie-card/movie-card";
import { MovieView } from "./movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";


export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [user, setUser ] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {
        if(!token) 
        return;
        
        fetch("https://movieflix-899d9c6c8969.herokuapp.com/movies", {
            headers: {Authorization: `Bearer ${token}`},
        })
        .then((response) => response.json())
        .then((data) => {
            console.log("movies from API:", data);
            const moviesFromApi = data.map((movie) => {
              return {
                id: movie._id,
                title: movie.Title,
                image: movie.ImageURL,
                description: movie.Description,
                genre: movie.Genre.Name,
                director: movie.Director.Name,
                rating: movie.Rating
              };
            });
    
            setMovies(moviesFromApi);
        });
    }, [token]);

    return (
        <Row> 
            {!user ? (
                <>
                    <LoginView onLoggedIn={(user) => setUser(user)} />
                    or
                    <SignupView />
                </>
                    ) : selectedMovie ? (
                        <MovieView 
                        movie={selectedMovie} 
                        onBackClick={() => setSelectedMovie(null)} 
                        />
                    ) : movies.length === 0 ? (
                        <div>The list is empty!</div>
                    ) : (
                <>
                    {movies.map((movie) => (
                    <MovieCard
                        key={movie._id}
                        movie={movie}
                        onMovieClick={(newSelectedMovie) => {
                        setSelectedMovie(newSelectedMovie);
                        }}
                    />
                    ))}
                </>
            )}
        </Row>
    );
};