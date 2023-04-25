import axiosClient from "./axiosClient";

export const apiGetCinemaShowtimes = async () => {
    const { data } = await axiosClient.get("/QuanLyRap/LayThongTinLichChieuHeThongRap", {
        params: {
            maNhom: "GP01",
        },
    });
    return data;
};