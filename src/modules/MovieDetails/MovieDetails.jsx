import React, { useCallback, useEffect, useState } from "react";
import MovieInfo from "./MovieInfo/MovieInfo";
import Showtimes from "./Showtimes/Showtimes";
import { useParams } from "react-router-dom";
import styles from "./MovieDetails.module.scss";

function MovieDetails() {
  // hooks useParams sẽ trả về  1 obj, trong đó key là movieId và value là mã phim khớp với path định nghĩa trên Route
  const { movieId } = useParams();
  // state quản lý thời lượng bộ phim được chọn
  const [movieDuration, setMovieDuration] = useState(null);
  const handleMovieDurationChange = useCallback(
    (movieDuration) => {
      setMovieDuration(movieDuration);
    },
    [movieId]
  );

  return (
    <div className={styles.background}>
      <MovieInfo movieId={movieId} movieDuration={movieDuration} />
      <Showtimes
        movieId={movieId}
        onMovieDurationChange={handleMovieDurationChange}
      />
    </div>
  );
}

export default MovieDetails;
