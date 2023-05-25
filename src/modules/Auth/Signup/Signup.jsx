import React from 'react';
import { useForm } from 'react-hook-form';
import styles from "./Signup.module.scss";
import { apiSignup } from "../../../apis/userAPI";
import { alertSuccess } from "../../../apis/sweetAlert2";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import PageNotFound from "../../../components/PageNotFound/PageNotFound";
import { useSelector } from "react-redux";

const PASSWORD_FORMAT = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
const NAME_FORMAT = /^[\p{L}\s]{2,}$/u;
const PHONENUMBER_FORMAT = /^0[0-9]{9}$/i;

const schema = yup.object({
    taiKhoan: yup.string().required("Tài khoản không được để trống!"),
    matKhau: yup.string().required("Mật khẩu không được để trống!")
        .matches(
            PASSWORD_FORMAT,
            "Mật khẩu phải có ít nhất 8 kí tự, 1 chữ hoa, 1 chữ thường và 1 số",
        ),
    matKhauConfirm: yup.string().required("Vui lòng xác nhận mật khẩu")
        .oneOf([yup.ref("matKhau"), null], "Mật khẩu không khớp!"),
    email: yup.string().email().required("Email không được để trống!"),
    soDt: yup.string().required("Số điện thoại không được để trống!")
        .matches(
            PHONENUMBER_FORMAT,
            "Số điện thoại không đúng định dạng",
        ),
    hoTen: yup.string().required("Họ tên không được để trống!")
        .matches(
            NAME_FORMAT,
            "Họ tên chỉ có có thể bao gồm chữ alphabet",
        ),
});

function Signup() {
    const { user } = useSelector((state) => state.user);

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            taiKhoan: "",
            matKhau: "",
            matKhauConfirm: "",
            email: "",
            soDt: "",
            hoTen: "",
        },
        mode: "onTouched",
        resolver: yupResolver(schema),
    });

    const postUserInfo = async (values) => {
        try {
            const data = await apiSignup(values);
            console.log(data);
            alertSuccess("Đăng ký thành công");
            navigate("/signin");
        } catch (error) {
            console.log(error.response?.data?.content);
        }
    };

    const navigate = useNavigate();

    const onSubmit = (values) => {
        console.log(values);
        postUserInfo(values);
    };

    const onError = (errors) => {
        console.log(errors);
    };

    if (user) return <PageNotFound />;

    return (
        <div className={styles.box}>
            <div className="p-4">
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
                            {...register("taiKhoan")}
                        />
                        {errors.taiKhoan && <p className="mt-1 text-danger">{errors.taiKhoan.message}</p>}
                    </div>

                    <div className="form-group mb-3">
                        <input
                            type="password"
                            className={`${styles.inputCustom} form-control`}
                            placeholder="Mật khẩu"
                            {...register("matKhau")}
                        />
                        {errors.matKhau && <p className="mt-1 text-danger">{errors.matKhau.message}</p>}
                    </div>

                    <div className="form-group mb-3">
                        <input
                            type="password"
                            className={`${styles.inputCustom} form-control`}
                            placeholder="Nhập lại mật khẩu"
                            {...register("matKhauConfirm")}
                        />
                        {errors.matKhauConfirm && <p className="mt-1 text-danger">{errors.matKhauConfirm.message}</p>}
                    </div>

                    <div className="form-group mb-3">
                        <input
                            type="email"
                            className={`${styles.inputCustom} form-control`}
                            placeholder="Email"
                            {...register("email")}
                        />
                        {errors.email && <p className="mt-1 text-danger">{errors.email.message}</p>}
                    </div>

                    <div className="form-group mb-3">
                        <input
                            type="text"
                            className={`${styles.inputCustom} form-control`}
                            placeholder="Số điện thoại"
                            {...register("soDt")}
                        />
                        {errors.soDt && <p className="mt-1 text-danger">{errors.soDt.message}</p>}
                    </div>

                    <div className="form-group mb-3">
                        <input
                            type="text"
                            className={`${styles.inputCustom} form-control`}
                            placeholder="Họ tên"
                            {...register("hoTen")}
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