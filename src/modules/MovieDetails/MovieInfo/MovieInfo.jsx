import React, { useEffect, useState } from 'react';
import { apiGetMovieDetails } from "../../../apis/movieAPI";

function MovieInfo({ movieId }) {
    const [movie, setMovie] = useState({});

    const getMovieDetails = async () => {
        try {
            const data = await apiGetMovieDetails(movieId);
            setMovie(data.content);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getMovieDetails();
    }, []);

    return (
        <div>
            <h1>MovieInfo</h1>
            <h3>{movie.tenPhim}</h3>
        </div>
    );
}

export default MovieInfo;