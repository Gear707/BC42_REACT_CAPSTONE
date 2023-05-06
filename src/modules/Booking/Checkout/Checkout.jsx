import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { checkoutSelectedSeats, fetchAllSeats } from "../../../slices/bookingSlice";
import Loading from "../../../components/Loading/Loading";
import { alertSuccess } from "../../../apis/sweetAlert2";

function Checkout({ bookingId }) {
    const { allSeats, selectedSeats, checkoutSeats, isLoading } = useSelector((state) => state.booking);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllSeats(bookingId));
    }, [bookingId]);

    const handleCheckout = () => {
        dispatch(checkoutSelectedSeats());
    };

    if (!allSeats || isLoading) return <Loading />;

    return (
        <div className="divBorder headingRight">
            <div className="divPadding fs-2 text-center">
                <p className="m-0 text-success">
                    {selectedSeats.reduce((total, seat) => total += seat.giaVe, 0).toLocaleString()} VNĐ
                </p>
            </div>
            <hr className="my-0 mx-3" />
            <div className="divPadding d-flex justify-content-between">
                <h3 className="headingCustom">Cụm Rạp:</h3>
                <h3 className="headingCustom text-danger">
                    {allSeats.thongTinPhim?.tenCumRap}
                </h3>
            </div>
            <hr className="m-0 mx-3" />
            <div className="divPadding d-flex justify-content-between">
                <h3 className="headingCustom">Địa chỉ:</h3>
                <h3 className="headingCustom text-danger col-9 textRight">
                    {allSeats.thongTinPhim?.diaChi}
                </h3>
            </div>
            <hr className="m-0 mx-3" />
            <div className="divPadding d-flex justify-content-between">
                <h3 className="headingCustom">Rạp:</h3>
                <h3 className="headingCustom text-danger">
                    {allSeats.thongTinPhim?.tenRap}
                </h3>
            </div>
            <hr className="m-0 mx-3" />
            <div className="divPadding d-flex justify-content-between">
                <h3 className="headingCustom">Ngày giờ chiếu:</h3>
                <h3 className="headingCustom text-danger">
                    {allSeats.thongTinPhim?.ngayChieu} - {allSeats.thongTinPhim?.gioChieu}
                </h3>
            </div>
            <hr className="m-0 mx-3" />
            <div className="divPadding d-flex justify-content-between">
                <h3 className="headingCustom">Tên Phim:</h3>
                <h3 className="headingCustom text-danger">
                    {allSeats.thongTinPhim?.tenPhim}
                </h3>
            </div>
            <hr className="m-0 mx-3" />
            <div className="mt-5">
                <button className="checkoutBtn btn btn-warning form-control rounded-0"
                    onClick={handleCheckout}>Đặt vé</button>
            </div>
        </div>
    );
}

export default Checkout;