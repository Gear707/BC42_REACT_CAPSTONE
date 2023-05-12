import React, { useEffect, useState } from "react";
import styles from "./UserManagement.module.scss";
import {
  apiDeleteUser,
  apiGetUserList,
  apiUpdateUser,
} from "../../../apis/userAPI";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { alertError, alertSuccess } from "../../../apis/sweetAlert2";

function UserManagement() {
  const [values, setValues] = useState({
    // hoTen: "",
    // taiKhoan: "",
    // matKhau: "",
    // email: "",
    // soDT: "",
    taiKhoan: "",
    matKhau: "",
    email: "",
    soDt: "",
    maNhom: "",
    maLoaiNguoiDung: "",
    hoTen: "",
  });

  const handleChange = (evt) => {
    const { value, name } = evt.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const [show, setShow] = useState(false);
  const [users, setUsers] = useState([]);
  // Hàm xóa user
  const handleDeleteUser = async (taiKhoan) => {
    try {
      await apiDeleteUser(taiKhoan);
      getUserList();
      alertError("Xóa user thành công");
    } catch (error) {
      alertError("Người dùng này đã đặt phim không thể xóa");
    }
  };

  const onSubmit = async (values) => {
    // const payload = { ...value, maNhom: value.maNhom };
    console.log(values);
    try {
      await apiUpdateUser(values);
      getUserList();
      alertSuccess("Cập nhật user thành công");
    } catch (error) {
      alertError("Cập nhật user thất bại");
    }
  };

  const handleSelectUser = (user) => {
    setShow(true);
    setValues(user);
  };

  // const handleChange = (evt) => {
  //   setValues(evt.target);
  // };

  // const onSubmit = (user) => {
  //   // setSelectedUser(user);
  //   setShow(true);
  //   console.log(user);
  //   setValues(user);
  // };

  const getUserList = async () => {
    try {
      const data = await apiGetUserList();
      setUsers(data.content);
    } catch (error) {
      console.log(error);
    }
  };

  // Định nghĩa các xác thực cho thuộc tính
  const schema = yup.object({
    taiKhoan: yup.string().required("Tài khoản không được để trống!"),
    hoTen: yup.string().required("Họ tên không được để trống!"),
    email: yup.string().required("Email không được để trống!"),
    soDT: yup.string().required("Số điện thoại không được để trống!"),
    matKhau: yup.string().required("Mật khẩu không được để trống!"),
    // maLoaiNguoiDung: yup
    //   .string()
    //   .required("Mã loại người dùng không được để trống!"),
    // .matches(
    //   PASSWORD_FORMAT,
    //   "Mật khẩu phải có ít nhất 8 kí tự, 1 chữ hoa, 1 chữ thường, 1 số và 1 ký tự đặc biệt"
    // ),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    // Khai báo các giá trị khởi tạo cho các input
    defaultValues: {
      taiKhoan: "",
      hoTen: "",
      email: "",
      soDT: "",
      matKhau: "",
      // maLoaiNguoiDung: "",
    },
    mode: "onTouched",
    resolver: yupResolver(schema),
  });

  const onError = (errors) => {
    console.log(errors);
  };

  useEffect(() => {
    getUserList();
  }, []);

  return (
    <div>
      <p className={styles.title1}>Quản lý tài khoản</p>
      <p className={styles.title2}>Danh sách người dùng</p>
      <table className="table">
        <thead>
          <tr className="">
            <th>STT</th>
            <th>Họ tên</th>
            <th>Tài khoản</th>
            <th>Mật khẩu</th>
            <th>Email</th>
            <th>SĐT</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{user.hoTen}</td>
                <td>{user.taiKhoan}</td>
                <td>{user.matKhau}</td>
                <td>{user.email}</td>
                <td>{user.soDT}</td>

                {/* <td>{user.maLoaiNguoiDung}</td> */}
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleSelectUser(user)}
                  >
                    <i class="fa-regular fa-pen-to-square"></i>
                  </button>
                  <button
                    className="btn btn-danger ms-1"
                    onClick={() => handleDeleteUser(user.taiKhoan)}
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
          <Modal.Title>Chỉnh sửa thông tin người dùng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            // onSubmit={handleSubmit(onSubmit, onError)}
            action=""
            className="form-group"
          >
            <div className="form-group mb-2">
              <label>Họ tên</label>
              <input
                type="text"
                className="form-control"
                onChange={handleChange}
                value={values?.hoTen}
                name="hoTen"
                // {...register("hoTen")}
              />
            </div>
            {errors.hoTen && (
              <p className="mt-1 text-danger">{errors.hoTen.message}</p>
            )}

            <div className="form-group mb-2">
              <label>Tài khoản</label>
              <input
                type="text"
                className="form-control"
                onChange={handleChange}
                value={values?.taiKhoan}
                name="taiKhoan"
                // {...register("taiKhoan")}
              />
            </div>
            {errors.taiKhoan && (
              <p className="mt-1 text-danger">{errors.taiKhoan.message}</p>
            )}

            <div className="form-group mb-2">
              <label>Mật khẩu</label>
              <input
                type="text"
                className="form-control"
                onChange={handleChange}
                value={values?.matKhau}
                name="matKhau"
                // {...register("matKhau")}
              />
            </div>
            {errors.matKhau && (
              <p className="mt-1 text-danger">{errors.matKhau.message}</p>
            )}

            <div className="form-group mb-2">
              <label>Email</label>
              <input
                type="text"
                className="form-control"
                onChange={handleChange}
                value={values?.email}
                name="email"
                // {...register("email")}
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-danger">{errors.email.message}</p>
            )}

            <div className="form-group mb-2">
              <label>Số điện thoại</label>
              <input
                type="text"
                className="form-control"
                onChange={handleChange}
                value={values?.soDT}
                name="soDT"
                // {...register("soDT")}
              />
            </div>
            {errors.soDT && (
              <p className="mt-1 text-danger">{errors.soDT.message}</p>
            )}

            <div className="form-group mb-2">
              <label>Mã nhóm</label>
              <input
                type="text"
                className="form-control"
                onChange={handleChange}
                value={values?.maNhom}
                name="maNhom"
                // {...register("soDT")}
              />
            </div>
            {errors.soDT && (
              <p className="mt-1 text-danger">{errors.soDT.message}</p>
            )}

            <div className="form-group mb-2">
              <span>Người dùng</span>
              <select className="form-control" name="maLoaiNguoiDung" id="">
                <option selected>{values.maLoaiNguoiDung}</option>
                <option value="QuanTri">QuanTri</option>
                <option value="KhachHang">KhachHang</option>
              </select>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={onSubmit}>
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

export default UserManagement;
