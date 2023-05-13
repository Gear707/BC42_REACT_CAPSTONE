import React, { useEffect, useState } from "react";
import styles from "./Movie.module.scss";
import { apiGetMovies } from "../../../apis/movieAPI";
import Button from "react-bootstrap/Button";
import Slider from "react-slick";
// import Modal from "react-bootstrap/Modal";
import MovieCard from "./MovieCard";

function Movies() {
  // Các state quản lý movies show ở trang Home
  const [movies, setMovies] = useState([]);
  const [movies1, setMovies1] = useState([]);
  const [movies2, setMovies2] = useState([]);
  const [movies3, setMovies3] = useState([]);
  const [error, setError] = useState(null);

  const getMovies = async () => {
    try {
      const data = await apiGetMovies();
      setMovies(data.content);
    } catch (error) {
      console.log(error);
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
      <Slider className="pb-5" style={{ paddingTop: "200px" }} {...settings}>
        <div>
          <div style={{ width: "960px", margin: "auto" }}>
            <div className="row mb-5">
              {movies.slice(0, 8).map((item, index) => {
                return (
                  <div key={index} className="col-sm-3 mt-3">
                    <MovieCard item={item} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div>
          <div style={{ width: "960px", margin: "auto" }}>
            <div className="row mb-5">
              {movies.slice(8, 16).map((item, index) => {
                return (
                  <div key={index} className="col-sm-3 mt-3">
                    <MovieCard item={item} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div>
          <div style={{ width: "960px", margin: "auto" }}>
            <div className="row mb-5">
              {movies.slice(16, 24).map((item, index) => {
                return (
                  <div key={index} className="col-sm-3 mt-3">
                    <MovieCard item={item} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Slider>
    </>
  );
}

export default Movies;
