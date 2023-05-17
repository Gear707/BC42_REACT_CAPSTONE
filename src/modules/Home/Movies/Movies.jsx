import React, { useEffect, useState } from "react";
import styles from "./Movie.module.scss";
import { apiGetMovies } from "../../../apis/movieAPI";
import Button from "react-bootstrap/Button";
import Slider from "react-slick";
import MovieCard from "./MovieCard";
import useWindowSize from "./useWindowSize";
import { alertError } from "../../../apis/sweetAlert2";

function Movies() {
  // Các state quản lý movies show ở trang Home
  const [movies, setMovies] = useState([]);
  const [movies1, setMovies1] = useState([]);
  const [error, setError] = useState(null);
  const size = useWindowSize();
  const getMovies = async () => {
    try {
      const data = await apiGetMovies();
      setMovies(data.content);
    } catch (error) {
      alertError("Lấy dữ liệu phim thất bại");
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    speed: 500,
    autoplaySpeed: 2000,
  };

  useEffect(() => {
    getMovies();
  }, []);

  if (error) return null;

  return (
    <>
      {size.width >= 992 ? (
        <Slider className="pb-5" style={{ paddingTop: "200px" }} {...settings}>
          <div>
            <div className={styles.sliderContainer}>
              <div className="row mb-5">
                {movies.slice(0, 8).map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="col-sm-4 col-md-4 col-lg-3 mt-3"
                    >
                      <MovieCard item={item} />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div>
            <div className={styles.sliderContainer}>
              <div className="row mb-5">
                {movies.slice(8, 16).map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="col-sm-4 col-md-4 col-lg-3 mt-3"
                    >
                      <MovieCard item={item} />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div>
            <div className={styles.sliderContainer}>
              <div className="row mb-5">
                {movies.slice(16, 24).map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="col-sm-4 col-md-4 col-lg-3 mt-3"
                    >
                      <MovieCard item={item} />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </Slider>
      ) : (
        <Slider className="pb-5" style={{ paddingTop: "200px" }} {...settings}>
          <div>
            <div className={styles.sliderContainer}>
              <div className="row mb-5">
                {movies.slice(0, 6).map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="col-6 col-sm-4 col-md-4 col-lg-3 mt-3"
                    >
                      <MovieCard item={item} />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div>
            <div className={styles.sliderContainer}>
              <div className="row mb-5">
                {movies.slice(6, 12).map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="col-6 col-sm-4 col-md-4 col-lg-3 mt-3"
                    >
                      <MovieCard item={item} />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div>
            <div className={styles.sliderContainer}>
              <div className="row mb-5">
                {movies.slice(12, 18).map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="col-6 col-sm-4 col-md-4 col-lg-3 mt-3"
                    >
                      <MovieCard item={item} />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </Slider>
      )}
    </>
  );
}

export default Movies;
