import React, { useEffect, useState } from 'react';
import styles from "./Movie.module.scss";
import { apiGetMovies } from "../../../apis/movieAPI";
import ReactPlayer from "react-player";

function Movies() {
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);

    const getMovies = async () => {
        try {
            const data = await apiGetMovies();
            setMovies(data.content);
        } catch (error) {
            setError(error.response?.data?.content);
        }
    };

    useEffect(() => {
        getMovies();
    }, []);

    if (error) return null;

    return (
        <div>
            {movies.map((item) => {
                return (
                    <div key={item.maPhim}>
                        <p>{item.tenPhim}</p>
                        {/* <Modal show={...} onHide={...} />
                        <ReactPlayer url={item.trailer} /> */}
                    </div>
                );
            })}
        </div>
    );
}

export default Movies;