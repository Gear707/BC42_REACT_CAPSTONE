import React, { useEffect, useState } from "react";
import { apiGetCinemaInfos } from "../../../apis/cinemaAPI";
import styles from "./Showtimes.module.scss";
import { Tabs } from "antd";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

function Showtimes({ movieId }) {
    const [cinema, setCinema] = useState({});
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const getCinemaInfos = async () => {
        try {
            const data = await apiGetCinemaInfos(movieId);
            setCinema(data.content);
            setIsLoading(false);
            console.log(data.content);
        } catch (error) {
            setError(error?.response?.data?.content);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getCinemaInfos();
    }, [movieId]);

    const tabs =
        Object.keys(cinema).length && cinema.heThongRapChieu.length ? (
            <Tabs
                tabPosition="left"
                items={cinema.heThongRapChieu.map((heThongRap, index) => {
                    return {
                        label: (
                            <div className={styles.heThongRap}>
                                <img className={styles.logo} src={heThongRap.logo} alt="" />
                            </div>
                        ),

                        key: `${heThongRap.maHeThongRap}-${index}`,
                        children: heThongRap.cumRapChieu.map((rap, index) => {
                            return (
                                <div
                                    key={`${rap.maCumRap}-${index}`}
                                    className={`ms-3 ${styles.maCumRap}`}
                                >
                                    <span className={styles.tenCumRap}>{rap.tenCumRap}</span>
                                    {rap.lichChieuPhim.map((lichChieu, index) => {
                                        return (
                                            <button
                                                key={`${lichChieu.maLichChieu}-${index}`}
                                                className={styles.ngayChieu}
                                                onClick={() =>
                                                    navigate(`/booking/${lichChieu.maLichChieu}`)
                                                }
                                            >
                                                {dayjs(lichChieu.ngayChieuGioChieu).format(
                                                    "DD-MM-YYYY "
                                                )}
                                                <span className={styles.gioChieu}>
                                                    {dayjs(lichChieu.ngayChieuGioChieu).format(
                                                        " ~ HH:mm"
                                                    )}
                                                </span>
                                            </button>
                                        );
                                    })}
                                </div>
                            );
                        }),
                    };
                })}
            />
        ) : (
            <p className="ps-3">Hiện tại phim chưa có suất chiếu</p>
        );

    return isLoading ? (
        <p>Đang tải dữ liệu...</p>
    ) : (
        <div id="lichChieu" className={styles.container}>
            {tabs}
        </div>
    );
}

export default Showtimes;