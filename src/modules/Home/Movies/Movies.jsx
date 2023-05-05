import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Movie.module.scss";
import { apiGetMovies } from "../../../apis/movieAPI";
import ReactPlayer from "react-player";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Slider from "react-slick";
import Modal from "react-bootstrap/Modal";

function Movies() {
    // Các state quản lý movies show ở trang Home
    const [movies, setMovies] = useState([]);
    const [movies1, setMovies1] = useState([]);
    const [movies2, setMovies2] = useState([]);
    const [movies3, setMovies3] = useState([]);
    const [error, setError] = useState(null);

    // state show modal trailer
    const [show, setShow] = useState(false);

    // hàm đóng mở trailer
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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
            setMovies2(data.content.slice(8, 16));
            setMovies3(data.content.slice(16, 24));
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
                                        <Card
                                            className={styles.movieCard}
                                            style={{ maxHeight: "420px" }}
                                        >
                                            <Card.Img
                                                variant="top"
                                                src={item.hinhAnh}
                                                className={styles.movieImg}
                                            />
                                            <div className={styles.trailerButton}>
                                                <button
                                                    className={styles.playButton}
                                                    tabIndex={0}
                                                    type="button"
                                                    onClick={handleShow}
                                                >
                                                    <img src="https://www.linkpicture.com/q/playButton.png" />
                                                </button>
                                            </div>
                                            <Card.Body>
                                                <Card.Title>
                                                    <div className={styles.movieTitle}>
                                                        {item.tenPhim}
                                                    </div>
                                                    <a
                                                        className={styles.orderButton}
                                                        onClick={() => navigate(`/movies/${item.maPhim}`)}
                                                    >
                                                        MUA VÉ
                                                    </a>
                                                </Card.Title>
                                                <Card.Text className={styles.description}>
                                                    {item.moTa}
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                        <Modal show={show} onHide={handleClose}>
                                            <ReactPlayer
                                                className={styles.trailerModal}
                                                url={item.trailer}
                                                config={{
                                                    video: {
                                                        playerVars: {
                                                            autoplay: 1,
                                                        },
                                                    },
                                                }}
                                            />
                                        </Modal>
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
                                        <Card
                                            className={styles.movieCard}
                                            style={{ maxHeight: "420px" }}
                                        >
                                            <Card.Img
                                                variant="top"
                                                src={item.hinhAnh}
                                                className={styles.movieImg}
                                            />
                                            <Modal show={show} onHide={handleClose}>
                                                <ReactPlayer
                                                    className={styles.trailerModal}
                                                    url={item.trailer}
                                                    config={{
                                                        video: {
                                                            playerVars: {
                                                                autoplay: 1,
                                                            },
                                                        },
                                                    }}
                                                />
                                            </Modal>
                                            <div className={styles.trailerButton}>
                                                <button
                                                    className={styles.playButton}
                                                    tabIndex={0}
                                                    type="button"
                                                    onClick={handleShow}
                                                >
                                                    <img src="https://www.linkpicture.com/q/playButton.png" />
                                                </button>
                                            </div>
                                            <Card.Body>
                                                <Card.Title>
                                                    <div className={styles.movieTitle}>
                                                        {item.tenPhim}
                                                    </div>
                                                    <a
                                                        className={styles.orderButton}
                                                        onClick={() => navigate(`/movies/${item.maPhim}`)}
                                                    >
                                                        MUA VÉ
                                                    </a>
                                                </Card.Title>
                                                <Card.Text className={styles.description}>
                                                    {item.moTa}
                                                </Card.Text>
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