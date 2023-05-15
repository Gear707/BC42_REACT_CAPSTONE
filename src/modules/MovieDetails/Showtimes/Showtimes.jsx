import React, { useEffect, useState } from "react";
import { apiGetCinemaInfos } from "../../../apis/cinemaAPI";
import styles from "./Showtimes.module.scss";
import antClass from "./antClass.scss";
import { Tabs } from "antd";
import CumRapChieu from "./CumRapChieu";
import HeThongRap from "./HeThongRap";

function Showtimes({ movieId, onMovieDurationChange }) {
  const [cinema, setCinema] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const getCinemaInfos = async () => {
    try {
      const data = await apiGetCinemaInfos(movieId);
      setCinema(data.content);
      setIsLoading(false);
    } catch (error) {
      setError(error.response?.data?.content);
      setIsLoading(false);
    }
  };

  const handleMovieDurationChange = (movieDuration) => {
    // truyền props lên lại component cha Showtimes
    onMovieDurationChange(movieDuration);
  };

  useEffect(() => {
    getCinemaInfos();
  }, [movieId]);

  const tabs =
    Object.keys(cinema).length && cinema.heThongRapChieu.length ? (
      <Tabs
        tabPosition="left"
        items={cinema.heThongRapChieu.map((heThongRap, index) => {
          return {
            label: <HeThongRap heThongRap={heThongRap} />,
            key: `${heThongRap.maHeThongRap}-${index}`,
            children: (
              <CumRapChieu
                onMovieDurationChange={handleMovieDurationChange}
                heThongRap={heThongRap}
              />
            ),
          };
        })}
      />
    ) : (
      <p className="ps-3">Hiện tại phim chưa có suất chiếu</p>
    );

  return isLoading ? (
    <p style={{ fontSize: "18px" }} className={`${styles.container} ps-3`}>
      Đang tải dữ liệu...
    </p>
  ) : (
    <div id="lichChieu" className={styles.container}>
      {tabs}
    </div>
  );
}

export default Showtimes;
