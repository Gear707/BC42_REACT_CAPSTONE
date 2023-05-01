import React from 'react';
import { useForm } from 'react-hook-form';
import styles from "./Signup.module.scss";
import { apiSignup } from "../../../apis/userAPI";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function Signup() {
    // Tạo thông báo popup
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 800
    });
    const alertSuccess = (text) => {
        Toast.fire({
            icon: 'success',
            title: text
        });
    };

    const PASSWORD_FORMAT = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,})/;
    const EMAIL_FORMAT = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const NAME_FORMAT = /^[\p{L}\s]{2,}$/u;
    const PHONENUMBER_FORMAT = /^0[0-9]{9}$/i;

    const { register, handleSubmit, formState: { errors }, watch } = useForm({
        defaultValues: {
            taiKhoan: "",
            matKhau: "",
            email: "",
            soDt: "",
            hoTen: "",
            matKhauConfirm: "",
        },
    });

    const postUserInfo = async (values) => {
        try {
            const data = await apiSignup(values);
            localStorage.setItem("userList", JSON.stringify(data));
            console.log(data);
            alertSuccess("Đăng ký thành công");
        } catch (error) {
            console.log(error.response?.data?.content);
        }
    };

    const navigate = useNavigate();

    const onSubmit = (values) => {
        console.log(values);
        postUserInfo(values);
        navigate("/signin");
    };

    const onError = (errors) => {
        console.log(errors);
    };

    const password = watch("matKhau");

    return (
        <div className={`col-md-7 col-lg-5 ${styles.box}`}>
            <div className="p-3 p-md-4">
                <div className={`${styles.icon} d-flex align-items-center justify-content-center`}>
                    <i className="fa-solid fa-lock text-white"></i>
                </div>
                <h3 className="text-center mb-4 fw-bold text-capitalize">Đăng ký</h3>
                <form onSubmit={handleSubmit(onSubmit, onError)}>
                    <div className="form-group mb-3">
                        <input
                            type="text"
                            className={`${styles.inputCustom} form-control`}
                            placeholder="Tài khoản"
                            {...register("taiKhoan", {
                                required: {
                                    value: true,
                                    message: "Tài khoản không được để trống!",
                                }
                            })}
                        />
                        {errors.taiKhoan && <p className="mt-1 text-danger">{errors.taiKhoan.message}</p>}
                    </div>

                    <div className="form-group mb-3">
                        <input
                            type="password"
                            className={`${styles.inputCustom} form-control`}
                            placeholder="Mật khẩu"
                            {...register("matKhau", {
                                required: {
                                    value: true,
                                    message: "Mật khẩu không được để trống!",
                                },
                                pattern: {
                                    value: PASSWORD_FORMAT,
                                    message: "Mật khẩu phải có ít nhất 8 kí tự, 1 chữ hoa, 1 chữ thường, 1 số và 1 ký tự đặc biệt",
                                }
                            })}
                        />
                        {errors.matKhau && <p className="mt-1 text-danger">{errors.matKhau.message}</p>}
                    </div>

                    <div className="form-group mb-3">
                        <input
                            type="password"
                            className={`${styles.inputCustom} form-control`}
                            placeholder="Nhập lại mật khẩu"
                            {...register("matKhauConfirm", {
                                required: {
                                    value: true,
                                    message: "Vui lòng xác nhận mật khẩu",
                                },
                                validate: (value) => value === password || "Mật khẩu xác nhận không khớp",
                            })}
                        />
                        {errors.matKhauConfirm && <p className="mt-1 text-danger">{errors.matKhauConfirm.message}</p>}
                    </div>

                    <div className="form-group mb-3">
                        <input
                            type="email"
                            className={`${styles.inputCustom} form-control`}
                            placeholder="Email"
                            {...register("email", {
                                required: {
                                    value: true,
                                    message: "Email không được để trống!",
                                },
                                pattern: {
                                    value: EMAIL_FORMAT,
                                    message: "Email không đúng định dạng",
                                }
                            })}
                        />
                        {errors.email && <p className="mt-1 text-danger">{errors.email.message}</p>}
                    </div>

                    <div className="form-group mb-3">
                        <input
                            type="text"
                            className={`${styles.inputCustom} form-control`}
                            placeholder="Số điện thoại"
                            {...register("soDt", {
                                required: {
                                    value: true,
                                    message: "Số điện thoại không được để trống!",
                                },
                                pattern: {
                                    value: PHONENUMBER_FORMAT,
                                    message: "Số điện thoại không đúng định dạng",
                                }
                            })}
                        />
                        {errors.soDt && <p className="mt-1 text-danger">{errors.soDt.message}</p>}
                    </div>

                    <div className="form-group mb-3">
                        <input
                            type="text"
                            className={`${styles.inputCustom} form-control`}
                            placeholder="Họ tên"
                            {...register("hoTen", {
                                required: {
                                    value: true,
                                    message: "Họ tên không được để trống!",
                                },
                                pattern: {
                                    value: NAME_FORMAT,
                                    message: "Họ tên chỉ có có thể bao gồm chữ alphabet",
                                }
                            })}
                        />
                        {errors.hoTen && <p className="mt-1 text-danger">{errors.hoTen.message}</p>}
                    </div>

                    <button className={`${styles.btnSignup} form-control btn mt-2 px-3`}>
                        Đăng ký
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Signup;