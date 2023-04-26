import React, { useEffect, useState } from 'react';
import styles from "./Movie.module.scss";
import { apiGetMovies } from "../../../apis/movieAPI";
import ReactPlayer from "react-player";
import { useNavigate } from "react-router-dom";

function Movies() {
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

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
        <div className={styles.movieContainer}>
            {movies.map((item, index) => {
                return (
                    <div key={index}>
                        <span>{item.tenPhim}</span>
                        <button onClick={() => navigate(`/movies/${item.maPhim}`)}>Mua vé</button>
                        {/* <Modal show={...} onHide={...} />
                        <ReactPlayer url={item.trailer} /> */}
                    </div>
                );
            })}
        </div>
    );
}

export default Movies;