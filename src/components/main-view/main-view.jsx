import React from "react";
import { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap/Row";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [movies, setMovies] = useState([]);
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

    if (!user) {
        return (
          <BrowserRouter>
                <NavigationBar
                    user={user}
                    movies={movies}
                    onLoggedOut={() => {
                        setUser(null);
                        setToken(null);
                        localStorage.clear();
                    }}
                />
                <Row className="justify-content-md-center"> 
                    <Routes>
                        <Route
                            path="/signup"
                            element={
                                <>
                                    {user ? (
                                        <Navigate to="/" />
                                    ) : (
                                        <Col md={5}>
                                        <SignupView/>
                                        </Col>
                                    )}
                                </>
                            }
                        />
                    <Route
                        path="/login"
                        element={
                            <>
                                {user ? (
                                <Navigate to="/" />
                                ) : (
                                <Col md={5}>
                                    <LoginView 
                                        onLoggedIn={(user, token) => {
                                        setUser(user);
                                        setToken(token);
                                        }} 
                                    />
                                </Col>
                                )}
                            </>
                        }
                        />
                        <Route
                        path="/movies/:movieId"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                    ) : movies.length === 0 ? (
                                    <Col>There are no movies</Col>
                                    ) : (
                                    <Col md={8}>
                                        <MovieView 
                                            movies={movies} 
                                            user={user}
                                            // token={token}
                                            // updateUser={updateUser} 
                                        />
                                    </Col>
                                )}
                            </>
                        }
                        />
                        <Route
                            path="/profile/"
                            element={
                                <>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ) : (
                                    <Col>
                                        <ProfileView 
                                            user={user}
                                            token={token}
                                            movies={movies}
                                            onLoggedOut={() => {
                                                setUser(null);
                                                setToken(null);
                                                localStorage.clear();
                                            }}
                                            // updateUser={updateUser} //newly added   
                                        />
                                    </Col> 
                                )}
                                </>
                            }
                        />
                        <Route
                            path="/"
                            element={
                                <>
                                    {!user ? (
                                        <Navigate to="/login" replace />
                                        ) : movies.length === 0 ? (
                                        <Col>The list is empty! Or is it</Col>
                                        ) : (
                                        <>
                                            {movies.map((movie) => (
                                            <Col key={movie._id} md={4} className="mb-4">
                                                <MovieCard movie={movie} user={user}/>
                                            </Col>
                                            ))}   
                                        </>
                                    )}
                                </>
                            }
                        />
                    </Routes>
                </Row>
          </BrowserRouter>
        );
    }
};