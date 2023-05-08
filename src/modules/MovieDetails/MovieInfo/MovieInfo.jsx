import React, { useEffect, useState } from "react";
import { apiGetMovieDetails } from "../../../apis/movieAPI";
import { apiGetCinemaInfos } from "../../../apis/cinemaAPI";
import moment from "moment";
import styles from "./MovieInfo.module.scss";
import ReactPlayer from "react-player";
import { Modal } from "react-bootstrap";

function MovieInfo({ movieId }) {
    const [movie, setMovie] = useState({});
    const [cinema, setCinema] = useState({});
    const [error, setError] = useState(null);
    
    // state show modal trailer
    const [show, setShow] = useState(false);
    const getMovieDetails = async () => {
        try {
            const data = await apiGetMovieDetails(movieId);
            setMovie(data.content);
            console.log(data.content);
        } catch (error) {
            console.log(error);
        }
    };

    const getCinemaInfos = async () => {
        try {
            const data = await apiGetCinemaInfos(movieId);
            setCinema(data.content);
            console.log(cinema);
        } catch (error) {
            setError(error?.response?.data?.content);
        }
    };

    // hàm đóng mở trailer
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        getMovieDetails();
        getCinemaInfos();
    }, [movieId]);

    return (
        <>
            <div className={styles.container}>
                <div style={{ marinTop: "100px" }} className="row">
                    <div className={`col-lg-3 ${styles.detailFormat}`}>
                        <img
                            className={styles.movieImg}
                            src={movie.hinhAnh}
                            alt=""
                            srcset=""
                        />
                        <a href="#lichChieu">
                            <button
                                className={`btn ${styles.purchaseButton}`}
                                disabled={cinema?.heThongRapChieu?.length === 0}
                            >
                                <i class="fa fa-ticket me-2"></i>
                                Mua vé
                            </button>
                        </a>
                        <div className={styles.trailerButton}>
                            <button
                                className={styles.playButton}
                                type="button"
                                onClick={handleShow}
                            >
                                <img src="https://www.linkpicture.com/q/playButton.png" />
                            </button>
                        </div>
                        <Modal show={show} onHide={handleClose}>
                            <ReactPlayer
                                className={styles.trailerModal}
                                url={movie.trailer}
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
                    {/* <h3>{movie.tenPhim}</h3> */}
                    <div className={`col-lg-7 ${styles.detailFormat}`}>
                        <span className="mb-2 d-block">
                            {moment(movie.ngayKhoiChieu).format("DD-MM-YYYY ")}
                        </span>
                        <span className={styles.movieTitle}>{movie.tenPhim}</span>
                        <span className={styles.description}>{movie.moTa}</span>
                    </div>
                    <div className={`col-lg-2 ${styles.detailFormat}`}>
                        <div className="d-flex flex-column ">
                            <img
                                className={styles.ratedImg}
                                src="https://www.linkpicture.com/q/Screenshot_2023-05-02_at_00.10.44-removebg-preview_6.png"
                                alt=""
                                srcset=""
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