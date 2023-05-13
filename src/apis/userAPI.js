import axiosClient from "./axiosClient";

export const apiSignin = async (values) => {
  const { data } = await axiosClient.post("/QuanLyNguoiDung/DangNhap", values);
  return data;
};

export const apiSignup = async (values) => {
  const payload = { ...values, maNhom: "GP06" };

  const { data } = await axiosClient.post("/QuanLyNguoiDung/DangKy", payload);
  return data;
};

export const apiUserInfo = async () => {
  const { data } = await axiosClient.post("/QuanLyNguoiDung/ThongTinTaiKhoan");
  return data;
};

export const apiGetUserList = async () => {
  const { data } = await axiosClient.get(
    "QuanLyNguoiDung/LayDanhSachNguoiDung",
    {
      params: {
        maNhom: "GP06",
      },
    }
  );
  return data;
};

export const apiDeleteUser = async (taiKhoan) => {
  const { data } = await axiosClient.delete(
    `QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`
  );
  return data;
};

export const apiUpdateUser = async (values) => {
  const { data } = await axiosClient.put(
    "QuanLyNguoiDung/CapNhatThongTinNguoiDung",
    {
      params: {
        maNhom: "GP06",
      },
    }
  );
  return data;
};

export const apiSearchUser = async (keywork) => {
  const { data } = await axiosClient.get(
    `QuanLyNguoiDung/TimKiemNguoiDung?MaNhom=GP06&tuKhoa=${keywork}`
  );
  return data;
};
