import React, { useEffect, useState } from 'react';
import styles from "./Showtimes.module.scss";
import "./antClassCustom.scss";
import { apiGetCinemaShowtimes } from "../../../apis/cinemaAPI";
import { Tabs } from 'antd';
import { NavLink, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import useWindowSize from "../Movies/useWindowSize";

function Showtimes() {
    const [cinemasShowtimes, setCinemasShowtimes] = useState([]);
    const [error, setError] = useState(null);
    const size = useWindowSize();

    const getCinemasShowtimes = async () => {
        try {
            const data = await apiGetCinemaShowtimes();
            setCinemasShowtimes(data.content);
        } catch (error) {
            setError(error?.response?.data?.content);
        }
    };

    const navigate = useNavigate();

    const renderTabs = () => {
        if (size.width >= 992) {
            return (
                <Tabs tabPosition="left" items={cinemasShowtimes.map((cinema, index) => {
                    return {
                        label: (
                            <div className={`${styles.logoBorder} position-relative m-1`}>
                                <img src={cinema.logo} alt="Cinema logo"
                                    className={`img-fluid ${styles.logoSize}`}
                                />
                            </div>
                        ),
                        key: `${index}-${cinema.maHeThongRap}`,
                        children: (
                            <Tabs tabPosition="left" items={cinema.lstCumRap.map((branch, index) => {
                                return {
                                    label: (
                                        <div className={styles.branchContainer}>
                                            <div className={styles.branchList}>
                                                <h4 className={styles.branchName} title={branch.tenCumRap}>
                                                    {branch.tenCumRap}
                                                </h4>
                                                <h6 className={styles.branchAddress} title={branch.diaChi}>
                                                    {branch.diaChi}
                                                </h6>
                                                <NavLink to="/" className={styles.branchDetails}>
                                                    Chi tiết
                                                </NavLink>
                                            </div>
                                        </div>
                                    ),
                                    key: index,
                                    children: branch.danhSachPhim.map((movie) => {
                                        return (
                                            <div className={styles.movieList} key={movie.maPhim}>
                                                <div className="d-flex p-3 justify-content-around">
                                                    <div className="col-3 px-3 d-flex justify-content-center">
                                                        <img src={movie.hinhAnh} alt={movie.tenPhim}
                                                            className={`img-fluid ${styles.movieImg}`}
                                                        />
                                                    </div>
                                                    <div className="col-9 ps-2">
                                                        <span className={styles.movieIcon}>
                                                            <i className="fa-solid fa-video"></i>
                                                        </span>
                                                        <span className={styles.movieName}>{movie.tenPhim}</span>
                                                        <div className="d-flex flex-wrap mt-3">
                                                            {movie.lstLichChieuTheoPhim.slice(0, 6).map((schedule) => {
                                                                return (
                                                                    <a className={`${styles.date} fw-bold`}
                                                                        key={`${movie.maPhim}-${schedule.maLichChieu}`}
                                                                        onClick={() => navigate(`/booking/${schedule.maLichChieu}`)}
                                                                    >
                                                                        {dayjs(schedule.ngayChieuGioChieu).format("DD-MM-YYYY ")}
                                                                        <span className={styles.time}>
                                                                            {dayjs(schedule.ngayChieuGioChieu).format("~ HH:mm")}
                                                                        </span>
                                                                    </a>
                                                                );
                                                            })}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    }),
                                };
                            })}
                            />
                        ),
                    };
                })}
                />
            );
        }
        else {
            return (
                <Tabs className="ms-3" tabPosition="top" items={cinemasShowtimes.map((cinema, index) => {
                    return {
                        label: (
                            <div className="position-relative m-1">
                                <img src={cinema.logo} alt="Cinema logo"
                                    className={`img-fluid ${styles.logoSize}`}
                                />
                            </div>
                        ),
                        key: `${index}-${cinema.maHeThongRap}`,
                        children: (
                            <Tabs tabPosition="top" items={cinema.lstCumRap.map((branch, index) => {
                                return {
                                    label: (
                                        <div className={styles.branchContainer}>
                                            <div className={styles.branchList}>
                                                <h4 className={styles.branchName} title={branch.tenCumRap}>
                                                    {branch.tenCumRap}
                                                </h4>
                                                <h6 className={styles.branchAddress} title={branch.diaChi}>
                                                    {branch.diaChi}
                                                </h6>
                                                <NavLink to="/" className={styles.branchDetails}>
                                                    Chi tiết
                                                </NavLink>
                                            </div>
                                        </div>
                                    ),
                                    key: index,
                                    children: branch.danhSachPhim.map((movie) => {
                                        return (
                                            <div className={styles.movieList} key={movie.maPhim}>
                                                <div className="d-flex p-3">
                                                    <div className="col-3 px-3 d-flex justify-content-center"
                                                        style={{ maxWidth: "150px", maxHeight: "100%" }}
                                                    >
                                                        <img src={movie.hinhAnh} alt={movie.tenPhim}
                                                            className={`img-fluid ${styles.movieImg}`}
                                                        />
                                                    </div>
                                                    <div className="col-9 ps-2">
                                                        <span className={styles.movieIcon}>
                                                            <i className="fa-solid fa-video"></i>
                                                        </span>
                                                        <span className={styles.movieName}>{movie.tenPhim}</span>
                                                        <div className="d-flex flex-wrap mt-3"
                                                        style={{maxWidth: "470px"}}>
                                                            {movie.lstLichChieuTheoPhim.slice(0, 4).map((schedule) => {
                                                                return (
                                                                    <a className={`${styles.date} fw-bold`}
                                                                        key={`${movie.maPhim}-${schedule.maLichChieu}`}
                                                                        onClick={() => navigate(`/booking/${schedule.maLichChieu}`)}
                                                                    >
                                                                        {dayjs(schedule.ngayChieuGioChieu).format("DD-MM-YYYY ")}
                                                                        <span className={styles.time}>
                                                                            {dayjs(schedule.ngayChieuGioChieu).format("~ HH:mm")}
                                                                        </span>
                                                                    </a>
                                                                );
                                                            })}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    }),
                                };
                            })}
                            />
                        ),
                    };
                })}
                />
            );
        }
    };

    useEffect(() => {
        getCinemasShowtimes();
    }, []);

    if (error) return null;

    return (
        <div id="cinema" className={styles.divCustom}>
            <div className={`${styles.showtimesContainer} container`}>
                {renderTabs()}
            </div>
        </div>
    );
}

export default Showtimes;