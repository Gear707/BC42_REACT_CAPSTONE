import React, { useState } from "react";
import ReactPlayer from "react-player";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import styles from "./Movie.module.scss";
import Card from "react-bootstrap/Card";
function MovieCard({ item }) {
  // state show modal trailer
  const [show, setShow] = useState(false);

  // hàm đóng mở trailer
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate();

  return (
    <>
      <Card className={styles.movieCard}>
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
            <div className={styles.movieTitle}>{item.tenPhim}</div>
            <a
              className={styles.orderButton}
              onClick={() => navigate(`/movies/${item.maPhim}`)}
            >
              MUA VÉ
            </a>
          </Card.Title>
          <Card.Text className={styles.description}>{item.moTa}</Card.Text>
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
    </>
  );
}

export default MovieCard;
