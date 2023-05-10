import React, { useEffect, useState } from "react";
import {
  apiDeleteMovie,
  apiGetMovieList,
  apiUpdateMovie,
} from "../../../../apis/movieAPI";
import { Button, Modal } from "react-bootstrap";
import styles from "../../UserManagement/UserManagement.module.scss";
import dayjs from "dayjs";
import axiosClient from "../../../../apis/axiosClient";

function MovieList() {
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

  const handleChange = (evt) => {
    const { value, name } = evt.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  console.log(values);
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
  const onSubmit = async (value) => {
    const ngayKhoiChieu = dayjs(value.ngayKhoiChieu).format("DD/MM/YYYY");
    const payload = {
      ...value,
      ngayKhoiChieu: ngayKhoiChieu,
    };

    try {
      await apiUpdateMovie(payload);
      getMovieList();
      setShow(false);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteMovie = async (movieId) => {
    try {
      await apiDeleteMovie();
      getMovieList();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMovieList();
  }, []);
  return (
    <div>
      <p className={styles.title}>Quản lý phim</p>
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
            <div className="">
              <p>Mã Phim</p>
              <input
                type="text"
                className="form-control"
                onChange={handleChange}
                name="maPhim"
                value={values?.maPhim}
                disabled="true"
              />
            </div>
            <div className="">
              <p>Tên Phim</p>
              <input
                type="text"
                className="form-control"
                onChange={handleChange}
                name="tenPhim"
                value={values?.tenPhim}
              />
            </div>

            <div className="">
              <p>Bí danh</p>
              <input
                type="text"
                className="form-control"
                name="biDanh"
                onChange={handleChange}
                value={values?.biDanh}
              />
            </div>

            <div className="">
              <p>Mô tả</p>
              <input
                type="text"
                className="form-control"
                onChange={handleChange}
                name="moTa"
                value={values?.moTa}
              />
            </div>

            <div className="">
              <p>Ngày khởi chiếu</p>
              <input
                type="text"
                className="form-control"
                onChange={handleChange}
                name="ngayKhoiChieu"
                value={dayjs(values?.ngayKhoiChieu).format("DD/MM/YYYY")}
              />
            </div>

            <div className="">
              <p>Trailer</p>
              <input
                type="text"
                className="form-control"
                onChange={handleChange}
                name="trailer"
                value={values?.trailer}
              />
            </div>

            <div className="">
              <p>Hình ảnh</p>
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

export default MovieList;
