import React from 'react';
import MovieInfo from "./MovieInfo/MovieInfo";
import Showtimes from "./Showtimes/Showtimes";
import { useParams } from "react-router-dom";
import styles from "./MovieDetails.module.scss";

function MovieDetails() {
    const { movieId } = useParams();

    return (
        <div className={styles.background}>
            <MovieInfo movieId={movieId} />

            <Showtimes movieId={movieId} />
        </div>
    );
}

export default MovieDetails;