import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchAllSeats } from "../../../slices/bookingSlice";
import styles from "./Checkout.module.scss";
import Loading from "../../../components/Loading/Loading";

function Checkout({ bookingId }) {
    const { allSeats, selectedSeats, checkoutSeats, isLoading } = useSelector((state) => state.booking);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllSeats(bookingId));
    }, [bookingId, selectedSeats, checkoutSeats]);

    if (!allSeats || isLoading) return <Loading />;

    return (
        <div className={`${styles.divBorder} ${styles.headingTop}`}>
            <div className={`${styles.divPadding} fs-2 text-center`}>
                <p className="m-0 text-warning">0 VNĐ</p>
            </div>
            <hr className="my-0 mx-3" />
            <div className={`${styles.divPadding} d-flex justify-content-between`}>
                <h3 className={styles.headingCustom}>Cụm Rạp:</h3>
                <h3 className={`${styles.headingCustom} text-danger`}>
                    {allSeats.thongTinPhim?.tenCumRap}
                </h3>
            </div>
            <hr className="m-0 mx-3" />
            <div className={`${styles.divPadding} d-flex justify-content-between`}>
                <h3 className={styles.headingCustom}>Địa chỉ:</h3>
                <h3 className={`${styles.headingCustom} text-danger col-9 ${styles.textRight}`}>
                    {allSeats.thongTinPhim?.diaChi}
                </h3>
            </div>
            <hr className="m-0 mx-3" />
            <div className={`${styles.divPadding} d-flex justify-content-between`}>
                <h3 className={styles.headingCustom}>Rạp:</h3>
                <h3 className={`${styles.headingCustom} text-danger`}>
                    {allSeats.thongTinPhim?.tenRap}
                </h3>
            </div>
            <hr className="m-0 mx-3" />
            <div className={`${styles.divPadding} d-flex justify-content-between`}>
                <h3 className={styles.headingCustom}>Ngày giờ chiếu:</h3>
                <h3 className={`${styles.headingCustom} text-danger`}>
                    {allSeats.thongTinPhim?.ngayChieu} - {allSeats.thongTinPhim?.gioChieu}
                </h3>
            </div>
            <hr className="m-0 mx-3" />
            <div className={`${styles.divPadding} d-flex justify-content-between`}>
                <h3 className={styles.headingCustom}>Tên Phim:</h3>
                <h3 className={`${styles.headingCustom} text-danger`}>
                    {allSeats.thongTinPhim?.tenPhim}
                </h3>
            </div>
            <hr className="m-0 mx-3" />
            <div className="mt-5">
                <button className={`${styles.checkoutBtn} btn btn-success form-control rounded-0`}>Đặt vé</button>
            </div>
        </div>
    );
}

export default Checkout;