import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Movie.module.scss";
import { apiGetMovies } from "../../../apis/movieAPI";
import ReactPlayer from "react-player";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Movies() {
    const [movies, setMovies] = useState([]);
    const [movies1, setMovies1] = useState([]);
    const [movies2, setMovies2] = useState([]);
    const [movies3, setMovies3] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        speed: 500,
        autoplaySpeed: 2000,
    };

    const getMovies = async () => {
        try {
            const data = await apiGetMovies();
            setMovies(data.content);
            setMovies1(data.content.slice(0, 8));
            setMovies2(data.content.slice(8, 10));
            // setMovies3(data.content.slice(0, 8));
        } catch (error) {
            console.log(error);
        }
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
                            {movies1.map((item, index) => {
                                return (
                                    <div key={index} className="col-lg-3 mt-3">
                                        <Card className="movieCard" style={{ maxHeight: "420px" }}>
                                            <Card.Img
                                                variant="top"
                                                src={item.hinhAnh}
                                                className={styles.movieImg}
                                            />
                                            <Card.Body>
                                                <Card.Title>
                                                    <div className={styles.movieTitle}>
                                                        <span className={styles.tagMovie}>C18</span>
                                                        {item.tenPhim}
                                                    </div>
                                                    <a
                                                        className={styles.orderButton}
                                                        onClick={() => navigate(`/movies/${item.maPhim}`)}
                                                    >
                                                        MUA VÉ
                                                    </a>
                                                </Card.Title>
                                                <Card.Text>{item.moTa}</Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                <div>
                    <div style={{ width: "960px", margin: "auto" }}>
                        <div className="row mb-5">
                            {movies2.map((item, index) => {
                                return (
                                    <div key={index} className="col-lg-3 mt-3">
                                        <Card className="movieCard" style={{ maxHeight: "420px" }}>
                                            <Card.Img
                                                variant="top"
                                                src={item.hinhAnh}
                                                className={styles.movieImg}
                                            />
                                            <Card.Body>
                                                <Card.Title>
                                                    <div className={styles.movieTitle}>
                                                        <span className={styles.tagMovie}>C18</span>
                                                        {item.tenPhim}
                                                    </div>
                                                    <a
                                                        className={styles.orderButton}
                                                        onClick={() => navigate(`/movies/${item.maPhim}`)}
                                                    >
                                                        MUA VÉ
                                                    </a>
                                                </Card.Title>
                                                <Card.Text>{item.moTa}</Card.Text>
                                            </Card.Body>
                                        </Card>
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