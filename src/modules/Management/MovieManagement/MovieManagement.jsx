import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import dayjs from "dayjs";
import {
  alertError,
  alertSuccess,
  warningDeleteMovie,
} from "../../../apis/sweetAlert2";
import {
  apiDeleteMovie,
  apiGetMovieList,
  apiUpdateMovie,
} from "../../../apis/movieAPI";
import { useNavigate } from "react-router-dom";
import styles from "./MovieManagement.module.scss";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Pagination from "react-paginate";
import "./Pagination.scss";

function MovieManagement() {
  // Định dạng file ảnh
  const PHOTO_FORMAT = /\.(jpeg|jpg|png|webp)$/i;
  // Định dạng đường dẫn Youtube
  const YOUTUBE_URL = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
  // Định dạng điểm đánh giá phim
  const RATEMPOINT = /^(10|[1-9])(\.\d+)?$/;
  const navigate = useNavigate();

  // state quản lý đóng/mở modal
  const [show, setShow] = useState(false);
  // state list phim
  const [movies, setMovies] = useState([]);
  // state quản lý phim được chọn để cập nhật
  const [movie, setMovie] = useState([]);
  // state lưu giữ mã phim trước khi chuyển trang Tạo lịch chiếu
  const [maPhim, setMaPhim] = useState(null);
  // state theo dõi ô input tìm kiếm
  const [values, setValues] = useState(null);
  // state theo dõi phân trang
  const [currentPage, setCurrentPage] = useState(1);

  // Định nghĩa các xác thực cho thuộc tính
  const schema = yup.object({
    tenPhim: yup.string().required("Tên phim không được để trống!"),
    moTa: yup.string().required("Mô tả không được để trống!"),
    danhGia: yup
      .string()
      .required("Số điểm không được để trống!")
      .matches(RATEMPOINT, "Số điểm phải nằm trong khoảng 1~10"),
    trailer: yup
      .string()
      .required("Trailer không được để trống!")
      .matches(YOUTUBE_URL, "Đường dẫn phải là đường dẫn từ Youtube"),
    hinhAnh: yup
      .mixed()
      .test(
        "fileType",
        "File không đúng định dạng (jpg, jpeg, png)",
        (value) => {
          // Nếu không up file =>true
          if (!value[0]?.name) {
            return true;
          }
          // Nếu có file thì bắt đầu kiểm tra định dạng
          if (value.length > 0) {
            return PHOTO_FORMAT.test(value[0].name);
          }
          return false;
        }
      )
      .test("fileSize", "Kích thước file không được vượt quá 1MB", (value) => {
        if (!value[0]?.name) {
          return true;
        }
        if (value.length && value[0]?.size <= 1000000) return true;
      }),
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
    // Khai báo các giá trị khởi tạo cho các input
    defaultValues: {
      maPhim: "",
      tenPhim: "",
      moTa: "",
      ngayKhoiChieu: "",
      hinhAnh: "",
      trailer: "",
      danhGia: "",
    },
    mode: "onTouched",
    resolver: yupResolver(schema),
  });

  // hàm cập nhật phim
  const onSubmit = async (values) => {
    const ngayKhoiChieu = dayjs(values.ngayKhoiChieu).format("DD/MM/YYYY");
    const payload = {
      ...values,
      hinhAnh: values?.hinhAnh[0] || undefined,
      ngayKhoiChieu: ngayKhoiChieu,
    };
    try {
      const data = await apiUpdateMovie(payload);
      if (data) {
        alertSuccess(data.message);
        getMovieList();
        setShow(false);
      }
    } catch (error) {
      alertError("Cập nhật phim thất bại");
    }
  };

  const onError = (errors) => {
    console.log(errors);
  };

  const handleSelectMovie = (movie) => {
    setShow(true);
    setMovie(movie);
    reset({
      maPhim: movie.maPhim,
      tenPhim: movie.tenPhim,
      moTa: movie.moTa,
      ngayKhoiChieu: dayjs(movie.ngayKhoiChieu).format("YYYY-MM-DD"),
      trailer: movie.trailer,
      maNhom: "GP06",
      danhGia: movie.danhGia,
    });
  };

  // hàm lấy danh sách phim và hiển thị
  const getMovieList = async (tenPhim) => {
    try {
      const data = await apiGetMovieList(tenPhim, currentPage);
      setMovies(data.content.items);
      if (tenPhim && data.content.items.length === 0) {
        alertError("Phim bạn tìm không có trong hệ thống");
      }
    } catch (error) {
      alertError("Lấy danh sách phim thất bại");
    }
  };

  // hàm xóa phim
  const handleDeleteMovie = async (movieId) => {
    const result = await warningDeleteMovie();
    if (result.isConfirmed) {
      try {
        await apiDeleteMovie(movieId);
        getMovieList();
        alertSuccess("Xóa phim thành công");
      } catch (error) {
        alertError("Xóa phim thất bại");
      }
    }
  };

  const handleChange = (evt) => {
    const { value, name } = evt.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handlePageChange = (data) => {
    setCurrentPage(data.selected + 1); // Cập nhật trang hiện tại với setPage
  };

  useEffect(() => {
    getMovieList();
  }, [currentPage]);

  return (
    <div>
      <p className={styles.title1}>Quản lý phim</p>
      <div className="d-flex justify-content-between">
        <p className={styles.title2}>Danh sách phim</p>
        <div className="d-flex me-3">
          <div className="input-group w-75">
            <input
              id="txtSearch"
              type="search"
              className="form-control"
              placeholder="Nhập từ khóa"
              name="keyword"
              onChange={handleChange}
            />
            <button
              className="btn btn-primary"
              onClick={() => getMovieList(values?.keyword)}
            >
              <i className="fa fa-search" />
            </button>
          </div>
          <button
            className="btn btn-success ms-3"
            onClick={() => navigate(`addNew`)}
          >
            Thêm
          </button>
        </div>
      </div>

      <table className="table">
        <thead>
          <tr className="">
            <th>Mã phim</th>
            <th>Hình ảnh</th>
            <th>Tên phim</th>
            <th>Mô tả</th>
            <th>Khởi chiếu</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {movies?.map((movie, index) => {
            return (
              <tr key={movie.maPhim}>
                <td style={{ width: "100px" }}>{movie.maPhim}</td>
                <td>
                  <img
                    style={{ height: "100px", width: "70px" }}
                    src={movie.hinhAnh}
                    alt={movie.tenPhim}
                  />
                </td>
                <td style={{ width: "250px" }}>{movie.tenPhim}</td>
                <td style={{ width: "500px" }}>{movie.moTa}</td>
                <td style={{ width: "150px" }}>
                  {dayjs(movie.ngayKhoiChieu).format("DD/MM/YYYY")}
                </td>
                <td style={{ width: "185px" }}>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleSelectMovie(movie)}
                  >
                    <i className="fa-regular fa-pen-to-square"></i>
                  </button>
                  <button
                    className="btn btn-danger ms-1"
                    onClick={() => handleDeleteMovie(movie.maPhim)}
                  >
                    <i className="fa-regular fa-trash-can ml-2"></i>
                  </button>
                  <button
                    className="btn btn-warning ms-1"
                    onClick={() => {
                      setMaPhim(movie.maPhim);
                      navigate(`showtime/${movie.maPhim}`);
                    }}
                  >
                    <i className="fa-solid fa-video ml-1"></i>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Pagination
        className="react-pagination mt-3"
        previousLabel="<"
        nextLabel=">"
        pageCount={5} // Số trang hiển thị
        pageRangeDisplayed={3} // Số trang hiển thị trong phân trang
        marginPagesDisplayed={2} // Số lượng trang được hiển thị ở hai bên mỗi phần phân trang
        onPageChange={handlePageChange}
      />
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Chỉnh sửa thông tin phim</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            onSubmit={handleSubmit(onSubmit, onError)}
            className="form-group"
          >
            <div className="form-group mb-2">
              <label>Mã Phim</label>
              <input
                type="text"
                className="form-control"
                disabled={true}
                {...register("maPhim")}
              />
            </div>
            <div className="form-group mb-2">
              <label>Tên Phim</label>
              <input
                type="text"
                className="form-control"
                {...register("tenPhim")}
              />
              {errors.tenPhim && (
                <p className="mt-1 text-danger">{errors.tenPhim.message}</p>
              )}
            </div>

            <div className="form-group mb-2">
              <label>Mô tả</label>
              <textarea
                type="text"
                className="form-control"
                rows={3}
                {...register("moTa")}
              />
              {errors.moTa && (
                <p className="mt-1 text-danger">{errors.moTa.message}</p>
              )}
            </div>

            <div className="form-group mb-2">
              <label>Ngày khởi chiếu</label>
              <input
                type="date"
                className="form-control"
                {...register("ngayKhoiChieu")}
              />
              {errors.ngayKhoiChieu && (
                <p className="mt-1 text-danger">
                  {errors.ngayKhoiChieu.message}
                </p>
              )}
            </div>

            <div className="form-group mb-2">
              <label>Trailer</label>
              <input
                type="text"
                className="form-control"
                {...register("trailer")}
              />
              {errors.trailer && (
                <p className="mt-1 text-danger">{errors.trailer.message}</p>
              )}
            </div>

            <div className="form-group mb-2">
              <label>Số điểm</label>
              <input
                type="number"
                min="1"
                max="10"
                className="form-control"
                {...register("danhGia")}
              />
              {errors.danhGia && (
                <p className="mt-1 text-danger">{errors.danhGia.message}</p>
              )}
            </div>

            <div className="form-group mb-2">
              <label>
                Hình ảnh (Lấy Poster cũ của phim nếu không cập nhật)
              </label>
              <input
                type="file"
                className="form-control"
                name="hinhAnh"
                {...register("hinhAnh")}
              />
              {errors.hinhAnh && (
                <p className="mt-1 text-danger">{errors.hinhAnh.message}</p>
              )}
            </div>

            <div className="d-flex justify-content-end mt-3">
              <button className="btn btn-primary me-2">Lưu</button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default MovieManagement;
