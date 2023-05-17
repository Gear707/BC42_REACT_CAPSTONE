import React, { useState } from "react";
import ReactPlayer from "react-player";
import { Modal } from "react-bootstrap";
import styles from "./MovieInfo.module.scss";

function MovieTrailer({ movie, cinema }) {
  // state show modal trailer
  const [error, setError] = useState(null);
  const [show, setShow] = useState(false);

  // hàm đóng mở trailer
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <img
        className={styles.movieImg}
        src={movie.hinhAnh}
        alt={movie.tenPhim}
      />
      <a href="#lichChieu">
        <button
          className={`btn ${styles.purchaseButton}`}
          disabled={cinema?.heThongRapChieu?.length === 0}
        >
          <i className="fa fa-ticket me-2"></i>
          Mua vé
        </button>
      </a>
      <div className={styles.trailerButton}>
        <button
          className={styles.playButton}
          type="button"
          onClick={handleShow}
        >
          <img
            src="https://www.linkpicture.com/q/playButton.png"
            alt="playButton"
          />
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
  );
}

export default MovieTrailer;
