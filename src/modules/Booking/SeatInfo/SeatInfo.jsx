import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchAllSeats } from "../../../slices/bookingSlice";
import styles from "./SeatInfo.module.scss";
import Loading from "../../../components/Loading/Loading";

function SeatInfo({ bookingId }) {
    const { allSeats, selectedSeats, checkoutSeats, isLoading } = useSelector((state) => state.booking);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllSeats(bookingId));
    }, [selectedSeats, checkoutSeats]);

    console.log(allSeats);

    if (!allSeats || isLoading) return <Loading />;

    return (
        <div className={`${styles.headingTop}`}>
            <div className="d-flex flex-column align-items-center mt-2">
                <div className="bg-dark" style={{width: "80%", height: "10px"}}></div>
                <div className={`${styles.screen} text-center`}>
                    <h6 className="mt-1 text-dark">Màn hình</h6>
                </div>
            </div>
        </div>
    );
}

export default SeatInfo;