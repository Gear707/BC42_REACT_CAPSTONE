import React, { useEffect, useState } from "react";
import {
  apiCreateMovieTime,
  apiGetCinema,
  apiGetCinemaBrand,
} from "../../../../apis/cinemaAPI";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";
import { alertError, alertSuccess } from "../../../../apis/sweetAlert2";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { apiGetMovieDetails } from "../../../../apis/movieAPI";
import styles from "./MovieShowtime.module.scss";

function MovieShowtime() {
  const [heThongRap, setHeThongRap] = useState([]);
  const [values, setValues] = useState([]);
  const [cumRap, setCumRap] = useState([]);
  const { maPhim } = useParams();
  const [movie, setMovie] = useState({});

  //Chuỗi regex để validation
  const TICKET_PRICE = /^[1-9]\d{4,}$/;
  const HETHONGRAP = /^(?!Chọn Hệ thống rạp$).*$/;
  const MARAP = /^(?!Chọn Cụm rạp$).*$/;

  // Định nghĩa các xác thực cho thuộc tính
  const schema = yup.object({
    ngayChieuGioChieu: yup
      .string()
      .required("Ngày chiếu, giờ chiếu không được để trống!"),
    maHeThongRap: yup
      .string()
      .required("Hệ thống rạp không được để trống!")
      .matches(HETHONGRAP, "Hệ thống rạp không được để trống!"),
    maRap: yup
      .string()
      .required("Cụm rạp không được để trống!")
      .matches(MARAP, "Cụm rạp không được để trống, chọn Hệ thống rạp trước!"),
    giaVe: yup
      .string()
      .required("Giá vé không được để trống!")
      .matches(TICKET_PRICE, "Giá vé phải lớn hơn 10.000VND"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      maHeThongRap: "Chọn Hệ thống rạp",
      maPhim: maPhim,
      ngayChieuGioChieu: "",
      maRap: "Chọn Cụm rạp",
      giaVe: "",
    },
    mode: "onTouched",
    resolver: yupResolver(schema),
  });

  // Hàm tạo lịch chiếu
  const onSubmit = async (values) => {
    const payload = {
      maPhim: maPhim || null,
      ngayChieuGioChieu: dayjs(values.ngayChieuGioChieu).format(
        "DD/MM/YYYY hh:mm:ss"
      ),
      maRap: values.maRap,
      giaVe: values.giaVe,
    };
    try {
      const data = await apiCreateMovieTime(payload);
      if (data) {
        alertSuccess(data.message);
        reset({
          maHeThongRap: "Chọn Hệ thống rạp",
          maPhim: "",
          ngayChieuGioChieu: "",
          maRap: "Chọn Cụm rạp",
          giaVe: "",
        });
      } else {
        alertError("Thêm lịch chiếu thất bại");
      }
    } catch (error) {
      alertError("Thêm lịch chiếu thất bại");
    }
  };

  const onError = (errors) => {
    console.log(errors);
  };

  // hàm lấy dữ liệu hệ thống rạp
  const getCinemaBrand = async () => {
    try {
      const data = await apiGetCinemaBrand();
      setHeThongRap(data.content);
    } catch (error) {
      alertError("Lấy dữ liệu hệ thống rạp thất bại");
    }
  };

  // hàm lấy dữ liệu cum rạp chiếu
  const getCinema = async () => {
    if (values.maHeThongRap) {
      try {
        const data = await apiGetCinema(values.maHeThongRap);
        setCumRap(data?.content);
      } catch (error) {
        console.log(error);
      }
    }
  };

  // hàm lấy chi tiết thông tin phim muốn tạo lịch chiếu
  const getMovieDetails = async () => {
    try {
      const data = await apiGetMovieDetails(maPhim);
      setMovie(data.content);
    } catch (error) {
      alertError("Lấy mã phim thất bại");
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
    getMovieDetails();
  }, [values.maHeThongRap, maPhim]);

  return (
    <div className="d-flex">
      <div className="ms-5 col-5">
        <h2>
          Tạo lịch chiếu <span></span>
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit, onError)}
          className="d-flex flex-column form-group mt-3"
        >
          <div className={styles.heThongRap}>
            <select
              className="form-control mb-3"
              name="maHeThongRap"
              value={values.maHeThongRap}
              {...register("maHeThongRap")}
              onChange={handleChange}
            >
              <option>Chọn Hệ thống rạp</option>
              {heThongRap?.map((heThongRap, index) => {
                return (
                  <option key={index} value={heThongRap.maHeThongRap}>
                    {heThongRap.maHeThongRap}
                  </option>
                );
              })}
            </select>
            {errors.maHeThongRap && (
              <p className="mt-1 text-danger">{errors.maHeThongRap.message}</p>
            )}
          </div>

          <div>
            <select
              className="form-control mb-3"
              name="maRap"
              {...register("maRap")}
            >
              <option>Chọn Cụm rạp</option>
              {cumRap?.map((cumRap, index) => {
                return <option key={index}>{cumRap.maCumRap}</option>;
              })}
            </select>
            {errors.maRap && (
              <p className="mt-1 text-danger">{errors.maRap.message}</p>
            )}
          </div>

          <div className="form-group">
            <label className="mb-2">Ngày chiếu, giờ chiếu</label>
            <input
              className="form-control mb-3"
              type="datetime-local"
              placeholder="Ngày chiếu giờ chiếu"
              name="ngayChieuGioChieu"
              {...register("ngayChieuGioChieu")}
            />
            {errors.ngayChieuGioChieu && (
              <p className="mt-1 text-danger">
                {errors.ngayChieuGioChieu.message}
              </p>
            )}
          </div>
          <div>
            <input
              className="form-control mb-3"
              type="number"
              placeholder="Giá vé"
              name="giaVe"
              min="10000"
              max="500000"
              step="5000"
              {...register("giaVe")}
            />
            {errors.giaVe && (
              <p className="mt-1 text-danger">{errors.giaVe.message}</p>
            )}
          </div>

          <button style={{ width: "140px" }} className="btn btn-success">
            Tạo lịch chiếu
          </button>
        </form>
      </div>
      <div className={`${styles.filmInfo} col-5`}>
        <img
          className={styles.poster}
          src={movie.hinhAnh}
          alt={movie.tenPhim}
        />
        <p className={styles.phim}>Tên phim: {movie.tenPhim}</p>
        <p className={styles.phim}>
          Ngày khởi chiếu:
          {dayjs(movie.ngayKhoiChieu).format("DD-MM-YYYY ")}
        </p>
      </div>
    </div>
  );
}

export default MovieShowtime;
