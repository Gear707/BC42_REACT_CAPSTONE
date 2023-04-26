import axiosClient from "./axiosClient";

export const apiGetCinemaShowtimes = async () => {
    const { data } = await axiosClient.get("/QuanLyRap/LayThongTinLichChieuHeThongRap", {
        params: {
            maNhom: "GP06",
        },
    });
    return data;
};