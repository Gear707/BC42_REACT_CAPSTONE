import React, { useEffect, useState } from 'react';
import styles from "./User.module.scss";
import { apiUserInfo } from "../../apis/userAPI";
import dayjs from "dayjs";
import Loading from "../../components/Loading/Loading";

function User() {
    const [userInfo, setUserInfo] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const getUserInfo = async () => {
        try {
            const data = await apiUserInfo();
            setUserInfo(data.content);
        } catch (error) {
            setError(error?.response?.data?.content);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getUserInfo();
    }, []);

    if (loading) return <Loading />;

    const renderBookingHistory = () => {
        return (userInfo?.thongTinDatVe?.map((ticket, index) => {
            return (
                <div className={`mt-2 ${styles.column}`} key={index}>
                    <div className="d-flex px-2">
                        <div className={`col-3 ${styles.leftDiv}`}>
                            <img src={ticket.hinhAnh}
                                alt={ticket.tenPhim}
                                className="img-fluid rounded-3 w-100 h-100"
                            />
                        </div>
                        <div className="col-9 ps-3">
                            <h4 className={styles.movieTitle}>{ticket.tenPhim}</h4>
                            <p>Ngày đặt: {dayjs(ticket.ngayDat).format("DD/MM/YYYY - HH:mm")}</p>
                            <p>
                                <span>Giá vé: {ticket.giaVe.toLocaleString()} VNĐ, </span>
                                <span>Thời lượng: {ticket.thoiLuongPhim} phút</span>
                            </p>
                            <h5 className={`text-success mb-0 mt-1 ${styles.cinemaName}`}>{ticket.danhSachGhe[0].tenHeThongRap}</h5>
                            <p className="text-danger mt-1">
                                <span>{ticket.danhSachGhe[0].tenRap} - Ghế: </span>
                                {ticket.danhSachGhe.map((seat) => {
                                    return seat.tenGhe;
                                }).join(", ")}
                            </p>
                        </div>
                    </div>
                </div>
            );
        }));
    };

    if (error) return null;

    return (
        <div className={styles.box}>
            <div className="p-4">
                <h3 className="text-center text-uppercase text-danger fw-bold mb-4">
                    Lịch sử đặt vé
                </h3>
                <hr />

                <div className="container">
                    <div className={`row mt-4 ${styles.grid}`}>
                        {renderBookingHistory()}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default User;