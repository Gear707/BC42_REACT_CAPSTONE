import axiosClient from "./axiosClient";

export const apiGetCinemaShowtimes = async () => {
  const { data } = await axiosClient.get(
    "/QuanLyRap/LayThongTinLichChieuHeThongRap",
    {
      params: {
        maNhom: "GP06",
      },
    }
  );
  return data;
};

export const apiGetCinemaInfos = async (movieId) => {
  const { data } = await axiosClient.get(
    "/QuanLyRap/LayThongTinLichChieuPhim",
    {
      params: {
        MaPhim: movieId,
      },
    }
  );
  return data;
};
