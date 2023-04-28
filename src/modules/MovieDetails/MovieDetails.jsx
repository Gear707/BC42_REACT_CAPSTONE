import React from 'react';
import MovieInfo from "./MovieInfo/MovieInfo";
import Showtimes from "./Showtimes/Showtimes";
import { useParams } from "react-router-dom";

function MovieDetails() {
    const { movieId } = useParams();

    return (
        <>
            <MovieInfo movieId={movieId} />

            <Showtimes movieId={movieId} />
        </>
    );
}

export default MovieDetails;