import styles from "./Showtimes.module.scss";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { useCallback, useEffect, useState } from "react";

function CumRapChieu({ heThongRap, onMovieDurationChange }) {
  const navigate = useNavigate();
  const [count, setCount] = useState(0);

  // Tạo một hàm callback lichchieu mới bên ngoài component
  const handleClick = useCallback(
    (lichChieu) => {
      navigate(`/booking/${lichChieu.maLichChieu}`);
    },
    [navigate]
  );

  useEffect(() => {
    // Truyền giá trị props onMovieDurationChange 1 lần khi duyệt qua phần tử lichChieu đầu tiên
    onMovieDurationChange(heThongRap.cumRapChieu[0].lichChieuPhim[0].thoiLuong);
    setCount(1);
  }, [heThongRap.cumRapChieu, onMovieDurationChange]);

  return (
    <div>
      {heThongRap.cumRapChieu.map((rap, index) => {
        return (
          <div
            key={`${rap.maCumRap}-${index}`}
            className={`ms-3 ${styles.maCumRap}`}
          >
            <span className={styles.tenCumRap}>{rap.tenCumRap}</span>
            {rap.lichChieuPhim.map((lichChieu, index) => {
              return (
                <button
                  key={`${lichChieu.maLichChieu}-${index}`}
                  className={styles.ngayChieu}
                  onClick={() => handleClick(lichChieu)}
                >
                  {dayjs(lichChieu.ngayChieuGioChieu).format("DD-MM-YYYY ")}
                  <span className={styles.gioChieu}>
                    {dayjs(lichChieu.ngayChieuGioChieu).format(" ~ HH:mm")}
                  </span>
                </button>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default CumRapChieu;
