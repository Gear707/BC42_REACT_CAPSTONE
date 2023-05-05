import axiosClient from "./axiosClient";

export const apiGetMovies = async () => {
  const { data } = await axiosClient.get("/QuanLyPhim/LayDanhSachPhim", {
    params: {
      maNhom: "GP06",
    },
  });
  return data;
};

export const apiGetBanners = async () => {
  const { data } = await axiosClient.get("/QuanLyPhim/LayDanhSachBanner");
  return data;
};

export const apiGetMovieDetails = async (movieId) => {
  const { data } = await axiosClient.get("/QuanLyPhim/LayThongTinPhim", {
    params: {
      MaPhim: movieId,
    },
  });
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
