import styles from "./MovieInfo.module.scss";
import dayjs from "dayjs";

function MovieScript({ movieDuration, movie }) {
  return (
    <div>
      <span className={styles.movieTitle}>{movie.tenPhim}</span>
      <span className={styles.description}>{movie.moTa}</span>
      <span className={styles.extraInfo}>
        Khởi chiếu: {dayjs(movie.ngayKhoiChieu).format("DD-MM-YYYY ")}
      </span>
      <span className={styles.extraInfo}>Đánh giá: {movie.danhGia}</span>
      {movieDuration ? (
        <span className={styles.extraInfo}>
          Thời lượng phim: {movieDuration} phút
        </span>
      ) : (
        <span className={styles.extraInfo}>
          Thời lượng phim: Chưa có thông tin
        </span>
      )}
    </div>
  );
}

export default MovieScript;
