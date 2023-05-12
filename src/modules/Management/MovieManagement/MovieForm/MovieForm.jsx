import React from "react";
import { useForm } from "react-hook-form";
import { apiCreateMovie } from "../../../../apis/movieAPI";
import dayjs from "dayjs";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { alertError, alertSuccess } from "../../../../apis/sweetAlert2";
import styles from "../MovieManagement.module.scss";
function MovieForm() {
  // Định dạng file ảnh
  const PHOTO_FORMAT = /\.(jpeg|jpg|png|webp)$/i;
  // Định dạng đường dẫn Youtube
  const YOUTUBE_URL = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;

  // Định nghĩa các xác thực cho thuộc tính
  const schema = yup.object({
    tenPhim: yup.string().required("Tên phim không được để trống!"),
    biDanh: yup.string().required("Bí danh không được để trống!"),
    moTa: yup.string().required("Mô tả không được để trống!"),
    trailer: yup
      .string()
      .required("Trailer không được để trống!")
      .matches(YOUTUBE_URL, "Đường dẫn phải là đường dẫn từ Youtube"),
    hinhAnh: yup
      .mixed()
      .required("Hình ảnh không được để trống!")
      .test(
        "fileType",
        "File không đúng định dạng (jpg, jpeg, png)",
        (value) => {
          if (value.length > 0) {
            return PHOTO_FORMAT.test(value[0].name);
          }
          return false;
        }
      )
      .test(
        "fileSize",
        "Kích thước file không được vượt quá 1MB",
        (value) => value.length && value[0].size <= 1000000
      ),
    ngayKhoiChieu: yup
      .string()
      .required("Ngày khởi chiếu không được để trống!"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      tenPhim: "",
      biDanh: "",
      moTa: "",
      trailer: "",
      hinhAnh: "",
      ngayKhoiChieu: "",
    },
    mode: "onTouched",
    resolver: yupResolver(schema),
  });

  const onSubmit = async (values) => {
    const ngayKhoiChieu = dayjs(values.ngayKhoiChieu).format("DD/MM/YYYY");
    const payload = {
      ...values,
      hinhAnh: values.hinhAnh[0],
      ngayKhoiChieu: ngayKhoiChieu,
    };
    try {
      await apiCreateMovie(payload);
      alertSuccess("Thêm phim mới thành công");
      // reset các ô input sau khi thêm thành công
      reset({
        tenPhim: "",
        biDanh: "",
        moTa: "",
        trailer: "",
        hinhAnh: "",
        ngayKhoiChieu: "",
      });
    } catch (error) {
      alertError(error.content);
    }
  };

  const onError = (errors) => {
    console.log(errors);
  };
  const [imageURL, setImageURL] = useState("");
  console.log(imageURL);
  console.info(imageURL);
  const handleChange = (event) => {
    const selectedFile = event.target.files[0];
    const imageUrl = URL.createObjectURL(selectedFile);
    setImageURL(imageUrl);
    console.info(imageUrl);
  };
  return (
    <div className="ms-5">
      <p className={styles.title1}>Quản lý phim</p>
      <p className={styles.title2}>Thêm phim mới</p>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <div className="form-group">
          <input
            className="form-control w-50 mb-2"
            placeholder="Tên Phim"
            {...register("tenPhim")}
          />
          {errors.tenPhim && (
            <p className="mt-1 text-danger">{errors.tenPhim.message}</p>
          )}
        </div>
        <div>
          <input
            className="form-control w-50 mb-3"
            placeholder="Bí Danh"
            {...register("biDanh")}
          />
          {errors.biDanh && (
            <p className="mt-1 text-danger">{errors.biDanh.message}</p>
          )}
        </div>
        <div>
          <input
            className="form-control w-50 mb-3"
            placeholder="Mô Tả"
            {...register("moTa")}
          />
          {errors.moTa && (
            <p className="mt-1 text-danger">{errors.moTa.message}</p>
          )}
        </div>
        <div>
          <input
            className="form-control w-50 mb-3"
            placeholder="Trailer"
            {...register("trailer")}
          />
          {errors.trailer && (
            <p className="mt-1 text-danger">{errors.trailer.message}</p>
          )}
        </div>
        <div>
          <input
            className="form-control w-50 mb-2"
            onChange={handleChange}
            type="file"
            placeholder="Hình Ảnh"
            name="hinhAnh"
            {...register("hinhAnh")}
          />
          {errors.hinhAnh && (
            <p className="mt-1 text-danger">{errors.hinhAnh.message}</p>
          )}

          <img
            style={{ height: "100px", width: "auto" }}
            src={imageURL}
            alt=""
            value={imageURL}
          />
        </div>
        <div>
          <input
            className="form-control w-50 mb-3"
            type="date"
            placeholder="Ngày Khởi Chiếu"
            {...register("ngayKhoiChieu")}
          />
          {errors.ngayKhoiChieu && (
            <p className="mt-1 text-danger">{errors.ngayKhoiChieu.message}</p>
          )}
        </div>
        <button className="btn btn-success mb-5" onClick={onSubmit}>
          Thêm phim
        </button>
      </form>
    </div>
  );
}

export default MovieForm;
