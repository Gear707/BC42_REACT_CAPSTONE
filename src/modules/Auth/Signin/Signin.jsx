import React from 'react';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { signin } from "../../../slices/userSlice";
import { Navigate, useSearchParams } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import styles from "./Signin.module.scss";

const PASSWORD_FORMAT = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

// Định nghĩa các xác thực cho thuộc tính
const schema = yup.object({
    taiKhoan: yup.string().required("Tài khoản không được để trống!"),
    matKhau: yup.string().required("Mật khẩu không được để trống!")
        .matches(
            PASSWORD_FORMAT,
            "Mật khẩu phải có ít nhất 8 kí tự, 1 chữ hoa, 1 chữ thường và 1 số"
        ),
});

function Signin() {
    const { register, handleSubmit, formState: { errors } } = useForm({
        // Khai báo các giá trị khởi tạo cho các input
        defaultValues: {
            taiKhoan: "",
            matKhau: ""
        },
        mode: "onTouched",
        resolver: yupResolver(schema),
    });

    const { user, isLoading, error } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const [searchParams, setSearchParams] = useSearchParams();
    console.log(searchParams.get("redirectUrl"));

    const onSubmit = (values) => {
        dispatch(signin(values));
    };

    const onError = (errors) => {
        console.log(errors);
    };

    // Kiểm tra nếu có thông tin user => đã đăng nhập => điều hướng về trang home
    if (user) {
        const url = searchParams.get("redirectUrl") || "/";
        return <Navigate to={url} />;
    };

    return (
        <div className={styles.box}>
            <div className="p-4">
                <div className={`${styles.icon} d-flex align-items-center justify-content-center`}>
                    <i className="fa-solid fa-user-large text-white"></i>
                </div>
                <h3 className="text-center mb-4 fw-bold text-capitalize">Đăng nhập</h3>
                <form onSubmit={handleSubmit(onSubmit, onError)}>
                    <div className="form-group mb-3">
                        <input type="text" placeholder="Tài khoản"
                            className={`${styles.inputCustom} form-control`}
                            {...register("taiKhoan")}
                        />
                        {errors.taiKhoan && <p className="mt-1 text-danger">{errors.taiKhoan.message}</p>}
                    </div>

                    <div className="form-group mb-3">
                        <input type="password" placeholder="Mật khẩu"
                            className={`${styles.inputCustom} form-control`}
                            {...register("matKhau")}
                        />
                        {errors.matKhau && <p className="mt-1 text-danger">{errors.matKhau.message}</p>}
                    </div>

                    {/* Hiển thị lỗi server trả về (sai tài khoản, mật khẩu) */}
                    {error && <p className="text-danger">Tài khoản, mật khẩu không đúng</p>}

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