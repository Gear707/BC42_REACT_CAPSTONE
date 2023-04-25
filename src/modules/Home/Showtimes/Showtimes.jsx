import React, { useEffect, useState } from 'react';
import styles from "./Showtimes.module.scss";
import { apiGetCinemaShowtimes } from "../../../apis/cinemaAPI";

function Showtimes() {
    const [cinemasShowtimes, setCinemasShowtimes] = useState([]);
    const [error, setError] = useState(null);

    const getCinemasShowtimes = async () => {
        try {
            const data = await apiGetCinemaShowtimes();
            setCinemasShowtimes(data.content);
            console.log(data.content);
        } catch (error) {
            setError(error.response?.data?.content);
        }
    };

    useEffect(() => {
        getCinemasShowtimes();
    }, []);

    return (
        <div>Showtimes</div>
    );
}

export default Showtimes;