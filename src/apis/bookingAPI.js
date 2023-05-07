import axiosClient from "./axiosClient";

export const apiGetSeats = async (showtimeId) => {
    const { data } = await axiosClient.get("/QuanLyDatVe/LayDanhSachPhongVe",
        {
            params: {
                MaLichChieu: showtimeId,
            }
        });
    return data;
};

export const apiBooking = async (bookingId, seatId, price) => {
    const payload = {
        maLichChieu: bookingId,
        danhSachVe: [
            {
                maGhe: seatId,
                giaVe: price
            }
        ],
    };

    const { data } = await axiosClient.post("/QuanLyDatVe/DatVe", payload);
    return data;
};