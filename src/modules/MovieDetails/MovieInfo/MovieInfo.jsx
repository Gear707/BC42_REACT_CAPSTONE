import React, { useEffect, useState } from "react";
import { apiGetMovieDetails } from "../../../apis/movieAPI";
import { apiGetCinemaInfos } from "../../../apis/cinemaAPI";
import styles from "./MovieInfo.module.scss";
import MovieScript from "./MovieScript";
import MovieTrailer from "./MovieTrailer";

function MovieInfo({ movieId, movieDuration }) {
  const [movie, setMovie] = useState({});
  const [cinema, setCinema] = useState({});
  const [error, setError] = useState(null);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  const getMovieDetails = async () => {
    try {
      const data = await apiGetMovieDetails(movieId);
      setMovie(data.content);
    } catch (error) {
      console.log(error);
    }
  };

  const getCinemaInfos = async () => {
    try {
      const data = await apiGetCinemaInfos(movieId);
      setCinema(data.content);
    } catch (error) {
      setError(error.response?.data?.content);
    }
  };

  useEffect(() => {
    getMovieDetails();
    getCinemaInfos();
    scrollToTop();
  }, [movieId]);

  return (
    <>
      <div className={styles.container}>
        <div style={{ marinTop: "100px" }} className="row">
          <div
            className={`col-md-3 col-sm-4 col-12 text-center ${styles.detailFormat}`}
          >
            <MovieTrailer movie={movie} cinema={cinema} />
          </div>
          <div className={`col-md-7 col-sm-8 ${styles.detailFormat}`}>
            <MovieScript movieDuration={movieDuration} movie={movie} />
          </div>
          <div
            className={`d-none col-2 d-sm-none d-md-block ${styles.detailFormat}`}
          >
            <div className="d-flex flex-column ">
              <img
                className={styles.ratedImg}
                src="https://www.linkpicture.com/q/Screenshot_2023-05-02_at_00.10.44-removebg-preview_6.png"
                alt="Số điểm"
              />
              <div className={styles.starGroup}>
                <i className={`fa-solid fa-star ${styles.star}`} />
                <i className={`fa-solid fa-star ${styles.star}`} />
                <i className={`fa-solid fa-star ${styles.star}`} />
                <i className={`fa-solid fa-star ${styles.star}`} />
                <i className={`fa-solid fa-star ${styles.star}`} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MovieInfo;
