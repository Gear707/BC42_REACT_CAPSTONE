import React, { useEffect, useState } from 'react';
import styles from "./Showtimes.module.scss";
import "./antClassCustom.scss";
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
                        <div className={`${styles.logoBorder} position-relative m-1`}>
                            <img src={cinema.logo} width={70} />
                        </div>,
                    key: `${index}-${cinema.maHeThongRap}`,
                    children:
                        <Tabs tabPosition="left"
                            items={cinema.lstCumRap.map((branch, index) => {
                                return {
                                    label:
                                        <div className={styles.branchContainer}>
                                            <div className={styles.branchList}>
                                                <h4 className={styles.branchName} title={branch.tenCumRap}>
                                                    {branch.tenCumRap}
                                                </h4>
                                                <h6 className={styles.branchAddress} title={branch.diaChi}>
                                                    {branch.diaChi}
                                                </h6>
                                                <a href="/" className={styles.branchDetails}>Chi tiết</a>
                                            </div>
                                        </div>,
                                    key: index,
                                    children: branch.danhSachPhim.map((movie) => {
                                        return (
                                            <div className={styles.movieList}>
                                                <div className="d-flex p-3 justify-content-around" key={movie.maPhim}>
                                                    <div className="col-2 d-flex justify-content-center">
                                                        <img src={movie.hinhAnh} 
                                                        className="img-fluid" 
                                                        styles={{ width: "auto" }}
                                                        alt={movie.tenPhim} />
                                                    </div>
                                                    <div className="col-9">
                                                        <span className={styles.movieIcon}>
                                                            <i className="fa-solid fa-video"></i>
                                                        </span>
                                                        <span className={styles.movieName}>
                                                            {movie.tenPhim}
                                                        </span>
                                                        <div className="d-flex flex-wrap mt-3">
                                                            {movie.lstLichChieuTheoPhim.slice(0, 6).map((dateTime, index) => {
                                                                return (
                                                                    <a href="/"
                                                                        key={`${index}-${dateTime.maRap}`}
                                                                        className={styles.dateTime}
                                                                    >
                                                                        {moment(dateTime.ngayChieuGioChieu).format("DD-MM-YYYY ~ HH:mm")}
                                                                    </a>
                                                                );
                                                            })}

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
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