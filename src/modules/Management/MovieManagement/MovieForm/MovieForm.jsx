import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { apiCreateMovie, apiGetMovieList } from "../../../../apis/movieAPI";
import dayjs from "dayjs";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { alertError, alertSuccess } from "../../../../apis/sweetAlert2";
import styles from "./MovieForm.module.scss";
import { Modal } from "react-bootstrap";
import ReactPlayer from "react-player";
import { useNavigate } from "react-router-dom";

function MovieForm() {
  const navigate = useNavigate();
  // state show modal trailer
  const [show, setShow] = useState(false);

  // hàm đóng mở trailer
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Định dạng file ảnh
  const PHOTO_FORMAT = /\.(jpeg|jpg|png|webp)$/i;
  // Định dạng đường dẫn Youtube
  const YOUTUBE_URL = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
  // Định dạng điểm đánh giá phim
  const RATEMPOINT = /^(10|[1-9])(\.\d+)?$/;

  // Định nghĩa các xác thực cho thuộc tính
  const schema = yup.object({
    tenPhim: yup.string().required("Tên phim không được để trống!"),
    moTa: yup.string().required("Mô tả không được để trống!"),
    danhGia: yup
      .string()
      .required("Đánh giá không được để trống!")
      .matches(RATEMPOINT, "Số điểm phải nằm trong khoảng 1~10"),
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
      moTa: "",
      trailer: "",
      hinhAnh: "",
      ngayKhoiChieu: "",
      danhGia: "",
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
      // Kiểm tra tên phim có trùng với tên phim trong list phim không?
      const { content } = await apiGetMovieList(payload.tenPhim);
      const tenPhimDaTonTai = content.count;
      if (tenPhimDaTonTai) {
        alertError("Tên phim đã tồn tại!");
        return;
      }
      const data = await apiCreateMovie(payload);
      if (data) {
        alertSuccess(data.message);
        // reset các ô input sau khi thêm thành công
        reset({
          tenPhim: "",
          moTa: "",
          trailer: "",
          hinhAnh: "",
          ngayKhoiChieu: "",
          danhGia: "",
        });
        setImageUrl(null);
        setYoutubeLink(null);
      }
    } catch (error) {
      alertError("Thêm phim thất bại");
    }
  };

  const onError = (errors) => {
    console.log(errors);
  };

  // state theo dõi file ảnh phim
  const [imageUrl, setImageUrl] = useState("");
  const handleImageChange = (evt) => {
    const file = evt.target.files[0];

    const reader = new FileReader();
    reader.onload = () => {
      setImageUrl(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const [youtubeLink, setYoutubeLink] = useState("");

  const handleTrailerChange = (event) => {
    const { value } = event.target;
    setYoutubeLink(value);
  };

  return (
    <div className="d-flex">
      <div className="ms-5 col-6">
        <p className={styles.title1}>Quản lý phim</p>
        <p className={styles.title2}>Thêm phim mới</p>
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <div className="form-group">
            <input
              className="form-control mb-2"
              placeholder="Tên Phim"
              {...register("tenPhim")}
            />
            {errors.tenPhim && (
              <p className="mt-1 text-danger">{errors.tenPhim.message}</p>
            )}
          </div>

          <div>
            <textarea
              className="form-control mb-2"
              placeholder="Mô Tả"
              rows={5}
              {...register("moTa")}
            />
            {errors.moTa && (
              <p className="mt-1 text-danger">{errors.moTa.message}</p>
            )}
          </div>
          <div>
            <input
              className="form-control mb-2"
              placeholder="Trailer"
              {...register("trailer")}
              onChange={handleTrailerChange}
            />
            {errors.trailer && (
              <p className="mt-1 text-danger">{errors.trailer.message}</p>
            )}
          </div>
          <div>
            <input
              className="form-control mb-2"
              type="file"
              placeholder="Hình Ảnh"
              name="hinhAnh"
              {...register("hinhAnh")}
              onChange={handleImageChange}
            />
            {errors.hinhAnh && (
              <p className="mt-1 text-danger">{errors.hinhAnh.message}</p>
            )}
          </div>
          <div>
            <input
              className="form-control mb-2"
              type="number"
              min="1"
              max="10"
              placeholder="Đánh giá phim"
              {...register("danhGia")}
            />
            {errors.danhGia && (
              <p className="mt-1 text-danger">{errors.danhGia.message}</p>
            )}
          </div>
          <div className="form-group mt-3">
            <label className="mb-2">Ngày khởi chiếu</label>
            <input
              className="form-control mb-2"
              type="date"
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
      <div className={`col-5 ${styles.trailer}`}>
        <button
          style={{ marginLeft: "320px", width: "150px" }}
          className="btn btn-primary"
          onClick={() => navigate("/admin/films")}
        >
          Danh sách phim
        </button>
        {imageUrl && (
          <div className={styles.trailer}>
            <img className={styles.poster} src={imageUrl} alt="Chosen image" />

            <div className={styles.trailerButton}>
              <button
                className={styles.playButton}
                tabIndex={0}
                type="button"
                disabled={!youtubeLink}
                onClick={() => setShow(true)}
              >
                <img src="https://www.linkpicture.com/q/playButton.png" />
              </button>
            </div>
          </div>
        )}
        <Modal show={show} onHide={handleClose}>
          <ReactPlayer
            className={styles.trailerModal}
            url={youtubeLink}
            config={{
              video: {
                playerVars: {
                  autoplay: 1,
                },
              },
            }}
          />
        </Modal>
      </div>
    </div>
  );
}

export default MovieForm;
