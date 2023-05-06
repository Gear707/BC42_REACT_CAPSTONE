import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { addSeats, fetchAllSeats } from "../../../slices/bookingSlice";
import Loading from "../../../components/Loading/Loading";

function SeatInfo({ bookingId }) {
    const { allSeats, selectedSeats, checkoutSeats, isLoading } = useSelector((state) => state.booking);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllSeats(bookingId));
    }, [bookingId]);

    const handleAddSeat = (seat) => {
        dispatch(addSeats(seat));
    };

    console.log(allSeats);

    if (!allSeats || isLoading) return <Loading />;

    const renderSeats = () => {
        return (allSeats?.danhSachGhe?.map((seat, index) => {
            // áp class cho ghế vip
            let vipSeatClass = seat.loaiGhe === "Vip" ? "vipSeat" : "";

            // áp class cho ghế đã đặt trước
            let reservedSeatClass = seat.daDat ? "reservedSeat" : "";

            // kiểm tra tất cả ghế đã render với các ghế đang có trong danh sách chọn
            let selectedIndex = selectedSeats.findIndex(
                (selectedSeat) => selectedSeat.maGhe === seat.maGhe
            );
            // nếu tồn tại ghế đã chọn thì áp class cho các ghế đang chọn
            let selectedSeatClass = selectedIndex !== -1 ? "selectedSeat" : "";

            // kiểm tra ghế sau khi nhấn button đặt vé
            let checkoutIndex = checkoutSeats.findIndex(
                (checkoutSeat) => checkoutSeat.maGhe === seat.maGhe
            );
            // nếu tồn tại ghế vừa checkout sau khi nhấn button thì áp class cho 
            let checkoutSeatClass = checkoutIndex !== -1 ? "checkoutSeat" : "";

            return (
                <Fragment key={index}>
                    {/* 1 hàng có tối đa 16 ghế */}
                    {(index + 1) % 16 === 0 ? <br /> : ""}

                    <button disabled={seat.daDat} onClick={() => handleAddSeat(seat)}
                        className={`emptySeats ${vipSeatClass} ${reservedSeatClass} ${selectedSeatClass} ${checkoutSeatClass}`}>
                        {seat.daDat ? <i className="fa-solid fa-xmark"></i> : seat.tenGhe}
                    </button>
                </Fragment>
            );
        }));
    };

    return (
        <div className="headingLeft mb-5">
            <div className="d-flex flex-column align-items-center mt-2">
                <div className="bg-dark" style={{ width: "80%", height: "10px" }}></div>
                <div className="screen text-center">
                    <h6 className="mt-2 text-dark">Màn hình</h6>
                </div>
                <div>
                    {renderSeats()}
                </div>
            </div>
        </div>
    );
}

export default SeatInfo;