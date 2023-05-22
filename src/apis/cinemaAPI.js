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

export const apiGetCinemaBrand = async (movieId) => {
  const { data } = await axiosClient.get("/QuanLyRap/LayThongTinHeThongRap", {
    params: {
      MaPhim: movieId,
    },
  });
  return data;
};

export const apiGetCinema = async (maHeThongRap) => {
  const data = await axiosClient.get(`QuanLyRap/LayThongTinCumRapTheoHeThong`, {
    params: {
      maHeThongRap: maHeThongRap || undefined,
    },
  });
  return data?.data;
};

export const apiCreateMovieTime = async (payload) => {
  const data = await axiosClient.post(`/QuanLyDatVe/TaoLichChieu`, payload);
  return data.data;
};
