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
import UserModal from "./UserModal";
function UserManagement() {
  const [values, setValues] = useState({
    taiKhoan: "",
    hoTen: "",
    email: "",
    soDT: "",
    matKhau: "",
  });

  const [show, setShow] = useState(false);
  const [users, setUsers] = useState([]);
  // Hàm xóa user
  const handleDeleteUser = async (userId) => {
    try {
      await apiDeleteUser(userId);
      getUserList();
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (values) => {
    try {
      await apiUpdateUser(values);
      getUserList();
    } catch (error) {
      console.log(error);
    }
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
    formState: { errors },
  } = useForm({
    // Khai báo các giá trị khởi tạo cho các input
    defaultValues: {
      taiKhoan: "",
      matKhau: "",
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
      <p className={styles.title}>Quản lý tài khoản</p>
      <table className="table">
        <thead>
          <tr className="">
            <th>STT</th>
            <th>Tài khoản</th>
            <th>Mật khẩu</th>
            <th>Họ tên</th>
            <th>Email</th>
            <th>SĐT</th>
            <th>Nhóm</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{user.taiKhoan}</td>
                <td>{user.hoTen}</td>
                <td>{user.email}</td>
                <td>{user.soDT}</td>
                <td>{user.matKhau}</td>
                {/* <td>{user.maLoaiNguoiDung}</td> */}
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleSelectUser(user)}
                  >
                    <i class="fa-regular fa-pen-to-square"></i>
                  </button>
                  <button className="btn btn-danger ms-1">
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
            onSubmit={handleSubmit(onSubmit, onError)}
            action=""
            className="form-group"
          >
            <div className="">
              <p>Họ tên</p>
              <input
                type="text"
                className="form-control"
                // onChange={handleChange}
                value={values?.hoTen}
                {...register("hoTen")}
              />
            </div>

            <div className="">
              <p>Tài khoản</p>
              <input
                type="text"
                className="form-control"
                // onChange={handleChange}
                value={values?.taiKhoan}
                {...register("taiKhoan")}
              />
            </div>

            <div className="">
              <p>Mật khẩu</p>
              <input
                type="text"
                className="form-control"
                // onChange={handleChange}
                value={values?.matKhau}
                {...register("matKhau")}
              />
            </div>

            <div className="">
              <p>Email</p>
              <input
                type="text"
                className="form-control"
                // onChange={handleChange}
                value={values?.email}
                {...register("email")}
              />
            </div>

            <div className="">
              <p>Số điện thoại</p>
              <input
                type="text"
                className="form-control"
                // onChange={handleChange}
                value={values?.soDT}
                {...register("soDT")}
              />
            </div>

            <div className="form-group">
              <p>Người dùng</p>
              <select className="form-control" name="" id="">
                <option selected value="">
                  Khách hàng
                </option>
                <option value="">Quản trị</option>
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
