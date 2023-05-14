import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import dayjs from "dayjs";
import { alertError, alertSuccess } from "../../../apis/sweetAlert2";
import {
  apiDeleteMovie,
  apiGetMovieList,
  apiUpdateMovie,
} from "../../../apis/movieAPI";
import { useNavigate } from "react-router-dom";
import styles from "./MovieManagement.module.scss";
function MovieManagement() {
  const navigate = useNavigate();
  // state theo dõi input
  const [values, setValues] = useState({
    maPhim: "",
    tenPhim: "",
    biDanh: "",
    moTa: "",
    ngayKhoiChieu: "",
    trailer: "",
    hinhAnh: "",
  });

  // state quản lý đóng/mở modal
  const [show, setShow] = useState(false);
  // state list phim
  const [movies, setMovies] = useState([]);
  // state lưu giữ mã phim trước khi chuyển trang Tạo lịch chiếu
  const [maPhim, setMaPhim] = useState(null);
  const handleChange = (evt) => {
    const { value, name } = evt.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSelectMovie = (movie) => {
    setShow(true);
    setValues(movie);
  };

  // hàm lấy danh sách phim và hiển thị
  const getMovieList = async () => {
    try {
      const data = await apiGetMovieList();
      setMovies(data.content);
    } catch (error) {
      console.log(error);
    }
  };

  // hàm cập nhật phim
  const onSubmit = async (values) => {
    const ngayKhoiChieu = dayjs(values.ngayKhoiChieu).format("DD/MM/YYYY");
    const payload = {
      ...values,
      ngayKhoiChieu: ngayKhoiChieu,
    };

    try {
      await apiUpdateMovie(payload);
      getMovieList();
      setShow(false);
      alertSuccess("Cập nhật phim thành công");
    } catch (error) {
      alertError("Cập nhật phim thất bại");
    }
  };

  // hàm xóa phim
  const deleteMovie = async (movieId) => {
    try {
      await apiDeleteMovie(movieId);
      getMovieList();
      alertSuccess("Xóa phim thành công");
    } catch (error) {
      alertError("Xóa phim thất bại");
    }
  };

  useEffect(() => {
    getMovieList();
  }, []);
  return (
    <div>
      <p className={styles.title1}>Quản lý phim</p>
      <div className="d-flex justify-content-between">
        <p className={styles.title2}>Danh sách phim</p>
        <div className="d-flex me-5">
          <div className="input-group w-75">
            <input
              id="txtSearch"
              type="text"
              className="form-control"
              placeholder="Nhập từ khóa"
            />
            <button className="btn btn-primary">
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
            <th>Ngày khởi chiếu</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie, index) => {
            return (
              <tr key={index}>
                <td>{movie.maPhim}</td>
                <td>
                  <img
                    style={{ height: "100px", width: "70px" }}
                    src={movie.hinhAnh}
                    alt=""
                  />
                </td>
                <td>{movie.tenPhim}</td>
                <td style={{ width: "350px" }}>{movie.moTa}</td>
                <td>{dayjs(movie.ngayKhoiChieu).format("DD/MM/YYYY")}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleSelectMovie(movie)}
                  >
                    <i class="fa-regular fa-pen-to-square"></i>
                  </button>
                  <button
                    className="btn btn-danger ms-1"
                    onClick={() => deleteMovie(movie.maPhim)}
                  >
                    <i class="fa-regular fa-trash-can ml-2"></i>
                  </button>
                  <button
                    className="btn btn-warning ms-1"
                    onClick={() => {
                      setMaPhim(movie.maPhim);
                      navigate(`showtime/${movie.maPhim}`);
                    }}
                  >
                    <i class="fa-solid fa-video ml-1"></i>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Chỉnh sửa thông tin phim</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form action="" className="form-group">
            <div className="form-group mb-2">
              <label>Mã Phim</label>
              <input
                type="text"
                className="form-control"
                onChange={handleChange}
                name="maPhim"
                value={values?.maPhim}
                disabled="true"
              />
            </div>
            <div className="form-group mb-2">
              <label>Tên Phim</label>
              <input
                type="text"
                className="form-control"
                onChange={handleChange}
                name="tenPhim"
                value={values?.tenPhim}
              />
            </div>

            <div className="form-group mb-2">
              <label>Bí danh</label>
              <input
                type="text"
                className="form-control"
                name="biDanh"
                onChange={handleChange}
                value={values?.biDanh}
              />
            </div>

            <div className="form-group mb-2">
              <label>Mô tả</label>
              <input
                type="text"
                className="form-control"
                onChange={handleChange}
                name="moTa"
                value={values?.moTa}
              />
            </div>

            <div className="form-group mb-2">
              <label>Ngày khởi chiếu</label>
              <input
                type="text"
                className="form-control"
                onChange={handleChange}
                name="ngayKhoiChieu"
                value={dayjs(values?.ngayKhoiChieu).format("DD/MM/YYYY")}
              />
            </div>

            <div className="form-group mb-2">
              <label>Trailer</label>
              <input
                type="text"
                className="form-control"
                onChange={handleChange}
                name="trailer"
                value={values?.trailer}
              />
            </div>

            <div className="form-group mb-2">
              <label>Hình ảnh</label>
              <input
                type="file"
                className="form-control"
                name="hinhAnh"
                onChange={handleChange}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => onSubmit(values)}>
            Cập nhật
          </Button>
          <Button variant="danger" onClick={() => setShow(false)}>
            Hủy
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default MovieManagement;
