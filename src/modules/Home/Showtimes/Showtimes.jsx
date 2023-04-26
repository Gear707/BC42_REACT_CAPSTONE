import React, { useEffect, useState } from 'react';
import styles from "./Showtimes.module.scss";
import { apiGetCinemaShowtimes } from "../../../apis/cinemaAPI";
import { Tabs } from 'antd';
import { NavLink } from "react-router-dom";
import moment from "moment/moment";

function Showtimes() {
    const [cinemasShowtimes, setCinemasShowtimes] = useState([]);
    const [error, setError] = useState(null);

    const getCinemasShowtimes = async () => {
        try {
            const data = await apiGetCinemaShowtimes();
            setCinemasShowtimes(data.content);
            console.log(data.content);
        } catch (error) {
            setError(error.response?.data?.content);
        }
    };

    const tabs = (
        <Tabs tabPosition="left"
            items={cinemasShowtimes.map((cinema, index) => {
                return {
                    label:
                        <div className={`${styles.logoBorder} position-relative m-1`} style={{width: "auto"}}>
                            <img src={cinema.logo} width={70} />
                        </div>,
                    key: `${index}-${cinema.maHeThongRap}`,
                    children:
                        <Tabs tabPosition="left"
                            items={cinema.lstCumRap.map((branch, index) => {
                                return {
                                    label:
                                        <>
                                            <div className="d-flex flex-column align-items-start text-uppercase" style={{ width: "300px" }}>
                                                <p>{branch.tenCumRap}</p>
                                                <p>{branch.diaChi}</p>
                                                <p>Chi tiết</p>
                                            </div>
                                            <hr />
                                        </>,
                                    key: index,
                                    children: branch.danhSachPhim.map((movie) => {
                                        return (
                                            <>
                                                <div className="d-flex p-3" key={movie.maPhim}>
                                                    <div className="col-2 d-flex justify-content-center">
                                                        <img src={movie.hinhAnh} className="img-fluid" width={100} />
                                                    </div>
                                                    <div className="col-9 container">
                                                        <h2>{movie.tenPhim}</h2>
                                                        <div className="row">
                                                            {movie.lstLichChieuTheoPhim.slice(0, 12).map((dateTime, index) => {
                                                                return (
                                                                    <div className="col-4 p-1">
                                                                        <NavLink to="/" key={index}>
                                                                            {moment(dateTime.ngayChieuGioChieu).format("DD-MM-YYYY ~ HH:mm")}
                                                                        </NavLink>
                                                                    </div>
                                                                );
                                                            })}
                                                        </div>

                                                    </div>

                                                </div>
                                                <hr />
                                            </>
                                        );
                                    })
                                };
                            })}
                        />,
                };
            })}
        />
    );

    useEffect(() => {
        getCinemasShowtimes();
    }, []);

    if (error) return null;

    return (
        <div className={`${styles.showtimesContainer} container`}>
            {tabs}
        </div>
    );
}

export default Showtimes;