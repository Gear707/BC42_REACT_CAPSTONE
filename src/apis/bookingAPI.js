import axiosClient from "./axiosClient";

export const apiGetSeats = async (showtimeId) => {
    const { data } = await axiosClient.get("/QuanLyDatVe/LayDanhSachPhongVe", {
        params: {
            MaLichChieu: showtimeId,
        }
    });
    return data;
};