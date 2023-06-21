import React from "react";
import { useState } from "react";
import { MovieCard } from "./movie-card/movie-card";
import { MovieView } from "./movie-view/movie-view";

export const MainView = () => {
    const [movies, setMovies] = useState([
        {
            id: 1,
            title: "Eloquent JavaScript",
            image:
              "https://images-na.ssl-images-amazon.com/images/I/51InjRPaF7L._SX377_BO1,204,203,200_.jpg",
            author: "Marijn Haverbeke"
        },
        {
            id: 2,
            title: "Mastering JavaScript Functional Programming",
            image:
              "https://images-na.ssl-images-amazon.com/images/I/51WAikRq37L._SX218_BO1,204,203,200_QL40_FMwebp_.jpg",
            author: "Federico Kereki"
        }
    ]);

    const [selectedMovie, setSelectedMovie] = useState(null);

    if (selectedMovie) {
        return (
            <MovieView 
                movie={selectedMovie}
                onBackClick={() => setSelectedMovie(null)} 
            />
        );
    }
  
    if (movies.length === 0) {
      return <div>The list is empty!</div>;
    }

    return (
        <div>
            {movies.map((movie) => (
                <MovieCard 
                    key={movie.id} 
                    movie={movie}
                    onMovieClick={(newSelectedMovie) => {
                        setSelectedMovie(newSelectedmovie);
                    }}
                />
            ))}
        </div>
    );
};