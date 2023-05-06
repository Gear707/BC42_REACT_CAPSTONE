import React, { useState } from "react";
import styles from "./MovieInfo.module.scss";
import moment from "moment/moment";
function MovieScript({ movieDuration, movie }) {
  return (
    <div>
      <span className={styles.movieTitle}>{movie.tenPhim}</span>
      <span className={styles.description}>{movie.moTa}</span>
      <span className="mb-2 d-block">
        Khởi chiếu: {moment(movie.ngayKhoiChieu).format("DD-MM-YYYY ")}
      </span>
      {movieDuration ? (
        <span> Thời lượng phim: {movieDuration} phút</span>
      ) : (
        <span> Thời lượng phim: Chưa có thông tin</span>
      )}
    </div>
  );
}

export default MovieScript;
