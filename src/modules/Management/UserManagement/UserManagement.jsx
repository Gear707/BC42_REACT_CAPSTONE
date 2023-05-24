import React, { useEffect, useState } from "react";
import styles from "./UserManagement.module.scss";
import {
  apiCreateNewUser,
  apiDeleteUser,
  apiGetUserList,
  apiSearchUser,
  apiUpdateUser,
} from "../../../apis/userAPI";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  alertError,
  alertSuccess,
  warningDeleteUser,
} from "../../../apis/sweetAlert2";

function UserManagement() {
  //state quản lý input search
  const [values, setValues] = useState(null);

  // hàm cập nhật state cho input search
  const handleChange = (evt) => {
    const { value, name } = evt.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  // state đóng mở modal
  const [show, setShow] = useState(false);
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);

  //Regex số điện thoại có 10-11 chữ số
  const PHONENUMBER = /^(0|84)+([1-9]{1})+([0-9]{8})\b/;
  const EMAIL = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const USERCODE = /^(?!Chọn loại người dùng$).*$/;
  // Định nghĩa các xác thực cho thuộc tính
  const schema = yup.object({
    taiKhoan: yup.string().required("Tài khoản không được để trống!"),
    hoTen: yup.string().required("Họ tên không được để trống!"),
    email: yup
      .string()
      .required("Email không được để trống!")
      .matches(EMAIL, "Email không đúng định dạng!"),
    soDT: yup
      .string()
      .required("Số điện thoại không được để trống!")
      .matches(PHONENUMBER, "Số điện thoại không dúng định dạng!"),
    matKhau: yup.string().required("Mật khẩu không được để trống!"),
    maLoaiNguoiDung: yup
      .string()
      .required("Mã loại người dùng không được để trống!")
      .matches(USERCODE, "Mã loại người dùng không được để trống!"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    // Khai báo các giá trị khởi tạo cho các input
    defaultValues: {
      taiKhoan: "",
      hoTen: "",
      email: "",
      soDT: "",
      matKhau: "",
      maLoaiNguoiDung: "",
    },
    mode: "onTouched",
    resolver: yupResolver(schema),
  });

  // hàm cập nhật user
  const onSubmit = async (values) => {
    if (user) {
      try {
        const data = await apiUpdateUser(values);
        if (data) {
          await getUserList();
          alertSuccess("Cập nhật user thành công");
          reset({
            taiKhoan: "",
            hoTen: "",
            email: "",
            soDT: "",
            matKhau: "",
            maLoaiNguoiDung: "",
          });
          setShow(false);
        }
      } catch (error) {}
    } else {
      try {
        const data = await apiCreateNewUser(values);
        if (data) {
          await getUserList();
          alertSuccess("Cập nhật user thành công");
          reset({
            taiKhoan: "",
            hoTen: "",
            email: "",
            soDT: "",
            matKhau: "",
            maLoaiNguoiDung: "",
          });
          setShow(false);
        }
      } catch (error) {}
    }
  };

  const onError = (errors) => {
    console.log(errors);
  };

  // Hàm xóa user
  const handleDeleteUser = async (taiKhoan) => {
    const result = await warningDeleteUser();
    if (result.isConfirmed) {
      try {
        await apiDeleteUser(taiKhoan);
        getUserList();
        alertSuccess("Xóa user thành công");
      } catch (error) {
        alertError("Người dùng này đã đặt phim không thể xóa");
      }
    }
  };

  // hàm dom giá trị input của user được chọn
  const handleSelectUser = (user) => {
    setShow(true);
    if (user) {
      setUser(user);
      reset({
        taiKhoan: user.taiKhoan,
        hoTen: user.hoTen,
        email: user.email,
        soDT: user.soDT,
        matKhau: user.matKhau,
        maNhom: "GP06",
        maLoaiNguoiDung: user.maLoaiNguoiDung,
      });
    } else {
      setUser(null);
      reset({
        taiKhoan: "",
        hoTen: "",
        email: "",
        soDT: "",
        matKhau: "",
        maNhom: "",
        maLoaiNguoiDung: "",
      });
    }
  };

  // hàm lấy danh sách user (của GP06) về và hiển thị
  const getUserList = async () => {
    try {
      const data = await apiGetUserList();
      setUsers(data.content);
    } catch (error) {
      console.log(error);
    }
  };

  // hàm tìm kiếm user
  const handleSearchUser = async (keyword) => {
    if (keyword) {
      try {
        const data = await apiSearchUser(keyword);
        setUsers(data.content);
      } catch (error) {
        alertError("Không tìm thấy user");
      }
    } else {
      getUserList();
    }
  };

  // hàm show password
  const handleShowPassWord = (evt) => {
    const passwordType = document.getElementById("password");
    console.log(passwordType);
    if (passwordType?.type === "password") {
      passwordType.type = "text";
    } else {
      passwordType.type = "password";
    }
  };

  useEffect(() => {
    getUserList();
  }, []);

  return (
    <div>
      <p className={styles.title1}>Quản lý tài khoản</p>
      <div className="d-flex justify-content-between">
        <p className={styles.title2}>Danh sách người dùng</p>
        <div className="d-flex mb-3">
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
              className="btn btn-primary me-3"
              onClick={() => handleSearchUser(values?.keyword)}
            >
              <i className="fa fa-search" />
            </button>
          </div>
          <button
            className="btn btn-success"
            onClick={() => handleSelectUser(null)}
          >
            Thêm
          </button>
        </div>
      </div>
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
                    <i className="fa-regular fa-pen-to-square"></i>
                  </button>
                  <button
                    className="btn btn-danger ms-1"
                    onClick={() => handleDeleteUser(user.taiKhoan)}
                  >
                    <i className="fa-regular fa-trash-can ml-2"></i>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Modal user={user} show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {user ? "Chỉnh sửa thông tin người dùng" : "Thêm mới người dùng"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            onSubmit={handleSubmit(onSubmit, onError)}
            className="form-group"
          >
            <div className="form-group mb-2">
              <label>Tài khoản</label>
              <input
                type="text"
                className="form-control"
                disabled={user}
                {...register("taiKhoan")}
              />
              {errors.taiKhoan && (
                <p className="mt-1 text-danger">{errors.taiKhoan.message}</p>
              )}
            </div>
            <div className="form-group mb-2">
              <label>Họ tên</label>
              <input
                type="text"
                className="form-control"
                {...register("hoTen")}
              />
            </div>
            {errors.hoTen && (
              <p className="mt-1 text-danger">{errors.hoTen.message}</p>
            )}
            <div className="form-group mb-2">
              <label>Mật khẩu</label>
              <input
                id="password"
                type="password"
                className="form-control"
                name="matKhau"
                {...register("matKhau")}
              />
              <label>Show password:</label>
              <input type="checkbox" onClick={handleShowPassWord} />
            </div>
            {errors.matKhau && (
              <p className="mt-1 text-danger">{errors.matKhau.message}</p>
            )}
            <div className="form-group mb-2">
              <label>Email</label>
              <input
                type="text"
                className="form-control"
                {...register("email")}
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
                {...register("soDT")}
              />
            </div>
            {errors.soDT && (
              <p className="mt-1 text-danger">{errors.soDT.message}</p>
            )}

            <div className="form-group mb-2">
              <span>Người dùng</span>
              <select
                className="form-control"
                name="maLoaiNguoiDung"
                {...register("maLoaiNguoiDung")}
                id=""
              >
                <option selected>Chọn loại người dùng</option>
                <option value="QuanTri">QuanTri</option>
                <option value="KhachHang">KhachHang</option>
              </select>
              {errors.maLoaiNguoiDung && (
                <p className="mt-1 text-danger">
                  {errors.maLoaiNguoiDung.message}
                </p>
              )}
            </div>

            <div className="d-flex justify-content-end">
              <button disabled={user} className="btn btn-success me-2">
                Thêm
              </button>
              <button disabled={!user} className="btn btn-primary">
                Cập nhật
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default UserManagement;
