import axiosClient from "./axiosClient";

export const apiGetSeats = async (bookingId) => {
    const { data } = await axiosClient.get("/QuanLyDatVe/LayDanhSachPhongVe",
        {
            params: {
                MaLichChieu: bookingId,
            }
        });
    return data;
};

export const apiCheckout = async (bookingId, checkoutList = []) => {
    const payload = { maLichChieu: bookingId, danhSachVe: checkoutList };

    const { data } = await axiosClient.post("/QuanLyDatVe/DatVe", payload);
    return data;
};