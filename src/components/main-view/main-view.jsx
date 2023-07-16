
import React, { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";

import { Row, Col } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);

    useEffect(() => {
      if (!token) {
        return;
      }

        fetch("https://movieflix-899d9c6c8969.herokuapp.com/movies", { 
          headers: {Authorization: `Bearer ${token}`}
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("movies from api:", data)
            const moviesfromAPI = data.map((movie) => {
              return {
                id: movie._id,
                image: movie.ImageURL,
                title: movie.Title,
                description: movie.Description,
                genre: movie.Genre.Name,
                director: movie.Director.Name,
                rating: movie.Rating
              }
            })
            setMovies(data)
          })
      }, [token]);


      return (
        <BrowserRouter>
          <NavigationBar
            user={user}
            onLoggedOut={() => {
              setUser(null);
              // setToken(null);
              // localStorage.clear();
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
                          <MovieView movies={movies} user={user} />
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
                          // onLoggedOut={onLoggedOut}
                          setUser={setUser}
                          token={token}
                          movies={movies}/>
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
                              <MovieCard movie={movie}/>
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
};
