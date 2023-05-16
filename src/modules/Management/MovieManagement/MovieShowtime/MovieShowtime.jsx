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

function MovieShowtime() {
  const [heThongRap, setHeThongRap] = useState([]);
  const [values, setValues] = useState([]);
  const [cumRap, setCumRap] = useState([]);
  const { maPhim } = useParams();
  const TICKET_PRICE = /^[1-9]\d{4,}$/;

  // Định nghĩa các xác thực cho thuộc tính
  const schema = yup.object({
    ngayChieuGioChieu: yup
      .string()
      .required("Ngày chiếu, giờ chiếu không được để trống!"),
    maRap: yup.string().required("Mã rạp không được để trống!"),
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
      maPhim: "",
      ngayChieuGioChieu: "",
      maRap: "",
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
      alertSuccess("Tạo lịch chiếu phim thành công");
    } catch (error) {
      console.log(error);
      alertError(error.content);
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
      console.log(error);
    }
  };

  // hàm lấy dữ liệu cum rạp chiếu
  const getCinema = async () => {
    try {
      const data = await apiGetCinema(values.maHeThongRap);
      setCumRap(data.content);
    } catch (error) {
      console.log(error);
    }
  };

  // const handleCreateMovieTime = async () => {
  //   const payload = {
  //     maPhim: maPhim || null,
  //     ngayChieuGioChieu: dayjs(values.ngayChieuGioChieu).format(
  //       "DD/MM/YYYY hh:mm:ss"
  //     ),
  //     maRap: values.maCumRap,
  //     giaVe: values.giaVe,
  //   };
  //   try {
  //     const data = await apiCreateMovieTime(payload);
  //     alertSuccess("Tạo lịch chiếu phim thành công");
  //   } catch (error) {
  //     console.log(error);
  //     alertError(error.content);
  //   }
  // };

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
      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        className="d-flex flex-column form-group"
      >
        <select
          className="form-control w-50 mb-3"
          name="maHeThongRap"
          id=""
          placeholder="Chọn hệ thống rạp"
          value={values.maHeThongRap}
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
        <div>
          <select
            className="form-control w-50 mb-3"
            name="maRap"
            id=""
            placeholder="Chọn cụm rạp"
            value={values.maCumRap}
            onChange={handleChange}
            {...register("maRap")}
          >
            <option>Chọn Cụm Rạp</option>
            {cumRap?.map((cumRap, index) => {
              return <option key={index}>{cumRap.maCumRap}</option>;
            })}
          </select>
          {errors.maRap && (
            <p className="mt-1 text-danger">{errors.maRap.message}</p>
          )}
        </div>

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
        <div>
          <input
            className="form-control w-50 mb-3"
            type="date"
            placeholder="Ngày chiếu giờ chiếu"
            name="ngayChieuGioChieu"
            value={values.ngayChieuGioChieu}
            {...register("ngayChieuGioChieu")}
            onChange={handleChange}
          />
          {errors.ngayChieuGioChieu && (
            <p className="mt-1 text-danger">
              {errors.ngayChieuGioChieu.message}
            </p>
          )}
        </div>
        <div>
          <input
            className="form-control w-50 mb-3"
            type="text"
            placeholder="Giá vé"
            name="giaVe"
            value={values.giaVe}
            {...register("giaVe")}
            onChange={handleChange}
          />
          {errors.giaVe && (
            <p className="mt-1 text-danger">{errors.giaVe.message}</p>
          )}
        </div>

        <button className="btn btn-success w-25">Tạo lịch chiếu</button>
      </form>
    </div>
  );
}

export default MovieShowtime;
