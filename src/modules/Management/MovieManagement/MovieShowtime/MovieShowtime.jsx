import React, { useEffect, useState } from "react";
import {
  apiCreateMovieTime,
  apiGetCinema,
  apiGetCinemaBrand,
} from "../../../../apis/cinemaAPI";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";
import { alertError, alertSuccess } from "../../../../apis/sweetAlert2";

function MovieShowtime() {
  const [heThongRap, setHeThongRap] = useState([]);
  const [values, setValues] = useState([]);
  const [cumRap, setCumRap] = useState([]);
  const { maPhim } = useParams();
  const getCinemaBrand = async () => {
    try {
      const data = await apiGetCinemaBrand();
      setHeThongRap(data.content);
    } catch (error) {
      console.log(error);
    }
  };

  const getCinema = async () => {
    try {
      const data = await apiGetCinema(values.maHeThongRap);
      setCumRap(data.content);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateMovieTime = async () => {
    const payload = {
      maPhim: maPhim || null,
      ngayChieuGioChieu: dayjs(values.ngayChieuGioChieu).format(
        "DD/MM/YYYY hh:mm:ss"
      ),
      maRap: values.maCumRap,
      giaVe: values.giaVe,
    };
    try {
      const data = await apiCreateMovieTime(payload);
      alertSuccess("Tạo lịch chiếu phim thành công");
    } catch (error) {
      console.log(error);
      alertError(error.content);
    }
  };

  const handleChange = (evt) => {
    const { value, name } = evt.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  useEffect(() => {
    getCinemaBrand();
    getCinema();
  }, [values]);

  return (
    <div className="ms-5">
      <h2>
        Tạo lịch chiếu <span></span>
      </h2>
      <img src="" alt="" />
      <form action="" className="d-flex flex-column form-group">
        <select
          className="form-control w-50 mb-3"
          name="maHeThongRap"
          id=""
          placeholder="Chọn hệ thống rạp"
          value={values.maHeThongRap}
          onChange={handleChange}
        >
          <option selected>Chọn Hệ thống rạp</option>
          {heThongRap?.map((heThongRap, index) => {
            return (
              <option key={index} value={heThongRap.maHeThongRap}>
                {heThongRap.maHeThongRap}
              </option>
            );
          })}
        </select>

        <select
          className="form-control w-50 mb-3"
          name="maCumRap"
          id=""
          placeholder="Chọn cụm rạp"
          value={values.maCumRap}
          onChange={handleChange}
        >
          <option selected>Chọn Cụm Rạp</option>
          {cumRap?.map((cumRap, index) => {
            return <option key={index}>{cumRap.maCumRap}</option>;
          })}
        </select>

        {/* <select
          className="form-control w-50 mb-3"
          name="maRap"
          id=""
          placeholder="Chọn mã rạp"
          value={values.maCumRap}
          onChange={handleChange}
        >
          <option selected>Chọn Mã Cụm Rạp</option>
          {cumRap.map((cumRapChieu, index) => {
            if (cumRapChieu.tenCumRap === values.tenCumRap) {
              return <option key={index}>{cumRapChieu.maCumRap}</option>;
            }
            return null;
          })}
        </select> */}

        <input
          className="form-control w-50 mb-3"
          type="date"
          placeholder="Ngày chiếu giờ chiếu"
          name="ngayChieuGioChieu"
          value={values.ngayChieuGioChieu}
          onChange={handleChange}
        />
        <input
          className="form-control w-50 mb-3"
          type="text"
          placeholder="Giá vé"
          name="giaVe"
          value={values.giaVe}
          onChange={handleChange}
        />
      </form>
      <button
        className="btn btn-success"
        onClick={() => handleCreateMovieTime()}
      >
        Tạo lịch chiếu
      </button>
    </div>
  );
}

export default MovieShowtime;
