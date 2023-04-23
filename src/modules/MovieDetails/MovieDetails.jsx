import React from 'react';
import MovieInfo from "./MovieInfo/MovieInfo";
import Showtimes from "./Showtimes/Showtimes";

function MovieDetails() {
    return (
        <>
            <MovieInfo />

            <Showtimes />
        </>
    );
}

export default MovieDetails;