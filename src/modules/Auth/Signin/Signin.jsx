import React from 'react';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { signin } from "../../../slices/userSlice";
import { Navigate } from "react-router-dom";

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
    };

    // Kiểm tra nếu có thông tin user => đã đăng nhập => điều hướng về trang home
    if (user) return <Navigate to="/" />;

    return (
        <div>
            <h1>Đăng nhập</h1>

            <form onSubmit={handleSubmit(onSubmit, onError)}>
                <div>
                    <input type="text" placeholder="Tài khoản"
                        {...register("taiKhoan", {
                            required: {
                                value: true,
                                message: "Tài khoản không được để trống",
                            }
                        })} />
                    {errors.taiKhoan && <p>{errors.taiKhoan.message}</p>}
                </div>

                <div>
                    <input type="password" placeholder="Mật khẩu"
                        {...register("matKhau", {
                            required: {
                                value: true,
                                message: "Mật khẩu không được để trống",
                            },
                            pattern: {
                                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                message: "Mật khẩu ít nhất 8 kí tự, phải có 1 chữ hoa, 1 chữ thường, 1 số và 1 ký tự đặc biệt",
                            }
                        })} />
                    {errors.matKhau && <p>{errors.matKhau.message}</p>}
                </div>

                {/* Hiển thị lỗi server trả về (sai tài khoản hoặc mật khẩu) */}
                {error && <p>{error}</p>}

                <button disabled={isLoading}>Đăng nhập</button>
            </form>
        </div>
    );
}

export default Signin;