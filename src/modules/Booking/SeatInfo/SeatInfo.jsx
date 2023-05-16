import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { addSeats, fetchAllSeats } from "../../../slices/bookingSlice";
import Loading from "../../../components/Loading/Loading";

function SeatInfo({ bookingId }) {
    const { allSeats, selectedSeats, checkoutSeats, isLoading } = useSelector((state) => state.booking);
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllSeats(bookingId));
    }, [bookingId]);

    const handleAddSeat = (seat) => {
        dispatch(addSeats(seat));
    };

    if (isLoading) return <Loading />;

    const renderSeats = () => {
        return (allSeats?.danhSachGhe?.map((seat, index) => {
            let vipSeatClass = seat.loaiGhe === "Vip" ? "vipSeat" : "";

            let reservedSeatClass = seat.daDat ? "reservedSeat" : "";

            let selectedIndex = selectedSeats?.findIndex(
                (selectedSeat) => selectedSeat.maGhe === seat.maGhe
            );
            let selectedSeatClass = selectedIndex !== -1 ? "selectedSeat" : "";

            let checkoutIndex = checkoutSeats?.findIndex(
                (checkoutSeat) => checkoutSeat.maGhe === seat.maGhe
            );
            let checkoutSeatClass = "";
            if (checkoutIndex !== -1) {
                checkoutSeatClass = "checkoutSeat";
            }
            else if (user.taiKhoan === seat.taiKhoanNguoiDat) {
                checkoutSeatClass = "checkoutSeat";
            }

            const checkBookedSeats = () => {
                if (seat.daDat) {
                    if (checkoutSeatClass !== "") {
                        return <i className="fa-solid fa-user"></i>;
                    } else {
                        return <i className="fa-solid fa-xmark"></i>;
                    }
                }
                else {
                    if (checkoutIndex !== -1) {
                        checkoutSeatClass = "checkoutSeat";
                        return <i className="fa-solid fa-user"></i>;
                    } else {
                        return seat.tenGhe;
                    }
                }
            };

            let btnHoverClass = seat.daDat || checkoutSeatClass !== "" ? "" : "btnHover";

            return (
                <Fragment key={index}>
                    <button className={`emptySeat ${vipSeatClass} ${reservedSeatClass} ${selectedSeatClass} ${checkoutSeatClass} ${btnHoverClass}`}
                        disabled={seat.daDat || checkoutSeatClass !== ""}
                        onClick={() => handleAddSeat(seat)}
                    >
                        {checkBookedSeats()}
                    </button>

                    {(index + 1) % 16 === 0 ? <br /> : ""}
                </Fragment>
            );
        }));
    };

    return (
        <div className="headingLeft">
            <div className="d-flex flex-column align-items-center mt-2">
                <div className="bg-dark screen"></div>
                <div className="screenLight text-center">
                    <h6 className="mt-2 text-dark">Màn hình</h6>
                </div>
                <div>
                    {renderSeats()}
                </div>
            </div>

            <div className="my-5 d-flex">
                <table className="table table-borderless text-center">
                    <thead>
                        <tr className="tableHeading">
                            <th>Ghế chưa đặt (thường)</th>
                            <th>Ghế chưa đặt (vip)</th>
                            <th>Ghế người khác đặt</th>
                            <th>Ghế đang chọn</th>
                            <th>Ghế bạn đặt</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <button className="emptySeat">
                                    <i className="fa-solid fa-check"></i>
                                </button>
                            </td>
                            <td>
                                <button className="vipSeat">
                                    <i className="fa-solid fa-check"></i>
                                </button>
                            </td>
                            <td>
                                <button className="reservedSeat">
                                    <i className="fa-solid fa-xmark"></i>
                                </button>
                            </td>
                            <td>
                                <button className="selectedSeat">
                                    <i className="fa-solid fa-check"></i>
                                </button>
                            </td>
                            <td>
                                <button className="checkoutSeat">
                                    <i className="fa-solid fa-user"></i>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default SeatInfo;