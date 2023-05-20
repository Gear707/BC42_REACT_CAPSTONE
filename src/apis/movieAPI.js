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

export const apiCreateMovie = async (movie) => {
  const formData = new FormData();
  for (let key in movie) {
    formData.append(key, movie[key]);
  }
  formData.append("maNhom", "GP06");

  const data = await axiosClient.post(
    "/QuanLyPhim/ThemPhimUploadHinh",
    formData
  );
  return data?.data;
};

export const apiGetMovieList = async (tenPhim, currentPage) => {
  const { data } = await axiosClient.get(
    `/QuanLyPhim/LayDanhSachPhimPhanTrang`,
    {
      params: {
        maNhom: "GP06",
        tenPhim: tenPhim || undefined,
        soTrang: currentPage,
        soPhanTuTrenTrang: 4,
      },
    }
  );
  return data;
};

export const apiUpdateMovie = async (movie) => {
  const formData = new FormData();
  for (let key in movie) {
    formData.append(key, movie[key]);
  }

  const data = await axiosClient.post(
    `/QuanLyPhim/CapNhatPhimUpload`,
    formData
  );
  return data?.data;
};

export const apiDeleteMovie = async (movieId) => {
  const { data } = await axiosClient.delete(
    `QuanLyPhim/XoaPhim?MaPhim=${movieId}`
  );
  return data;
};
