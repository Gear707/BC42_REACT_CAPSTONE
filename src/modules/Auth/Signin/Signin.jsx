import React from 'react';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { signin } from "../../../slices/userSlice";
import { Navigate } from "react-router-dom";
import styles from "./Signin.module.scss";
import { alertError } from "../../../apis/sweetAlert2";

function Signin() {
    const { user, isLoading, error } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const { register, handleSubmit, formState: { errors } } = useForm({
        // Khai báo các giá trị khởi tạo cho các input
        defaultValues: {
            taiKhoan: "",
            matKhau: ""
        }
    });

    const onSubmit = (values) => {
        dispatch(signin(values));
    };

    const onError = (errors) => {
        console.log(errors);
        alertError("Đăng nhập thất bại");
    };

    const PASSWORD_FORMAT = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,})/;

    // Kiểm tra nếu có thông tin user => đã đăng nhập => điều hướng về trang home
    if (user) return <Navigate to="/" />;

    return (
        <div className={`col-md-7 col-lg-5 ${styles.box}`}>
            <div className="p-3 p-md-4">
                <div className={`${styles.icon} d-flex align-items-center justify-content-center`}>
                    <i className="fa-solid fa-user-large text-white"></i>
                </div>
                <h3 className="text-center mb-4 fw-bold text-capitalize">Đăng nhập</h3>
                <form onSubmit={handleSubmit(onSubmit, onError)}>
                    <div className="form-group mb-3">
                        <input type="text" placeholder="Tài khoản"
                            className={`${styles.inputCustom} form-control`}
                            {...register("taiKhoan", {
                                required: {
                                    value: true,
                                    message: "Tài khoản không được để trống!",
                                }
                            })} />
                        {errors.taiKhoan && <p className="mt-1 text-danger">{errors.taiKhoan.message}</p>}
                    </div>

                    <div className="form-group mb-3">
                        <input type="password" placeholder="Mật khẩu"
                            className={`${styles.inputCustom} form-control`}
                            {...register("matKhau", {
                                required: {
                                    value: true,
                                    message: "Mật khẩu không được để trống!",
                                },
                                pattern: {
                                    value: PASSWORD_FORMAT,
                                    message: "Mật khẩu phải có ít nhất 8 kí tự, 1 chữ hoa, 1 chữ thường, 1 số và 1 ký tự đặc biệt",
                                }
                            })} />
                        {errors.matKhau && <p className="mt-1 text-danger">{errors.matKhau.message}</p>}
                    </div>

                    {/* Hiển thị lỗi server trả về (sai tài khoản hoặc mật khẩu) */}
                    {error && <p className="text-danger">{error}</p>}

                    <div className="form-group">
                        <button className={`${styles.btnSignin} form-control btn mt-2 px-3`}
                            disabled={isLoading}>Đăng nhập</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Signin;