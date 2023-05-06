import moment from "moment/moment";
import React from "react";
import styles from "./Showtimes.module.scss";
import { useNavigate } from "react-router-dom";

function CumRapChieu({ onMovieDurationChange, heThongRap }) {
  const navigate = useNavigate();
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
              onMovieDurationChange(lichChieu.thoiLuong);
              return (
                <button
                  key={`${lichChieu.maLichChieu}-${index}`}
                  className={styles.ngayChieu}
                  onClick={() => navigate(`/booking/${lichChieu.maLichChieu}`)}
                >
                  {moment(lichChieu.ngayChieuGioChieu).format("DD-MM-YYYY ")}
                  <span className={styles.gioChieu}>
                    {moment(lichChieu.ngayChieuGioChieu).format(" ~ HH:mm")}
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
