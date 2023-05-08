import styles from "./Showtimes.module.scss";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { useState } from "react";

function CumRapChieu({ onMovieDurationChange, heThongRap }) {
  const navigate = useNavigate();
  const [count, setCount] = useState(0); // cờ hiệu để truyền giá trị props onMovieDurationChange 1 lần khi duyệt qua phần tử lichChieu đầu tiên
  console.log(count);
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
              if (!count) {
                onMovieDurationChange(lichChieu.thoiLuong);
                setCount(count + 1);
                console.log(count);
              }
              return (
                <button
                  key={`${lichChieu.maLichChieu}-${index}`}
                  className={styles.ngayChieu}
                  onClick={() => navigate(`/booking/${lichChieu.maLichChieu}`)}
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
