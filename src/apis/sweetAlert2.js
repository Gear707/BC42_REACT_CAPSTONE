import Swal from "sweetalert2";

// Tạo thông báo popup
const Popup = Swal.mixin({
  // toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 1500,
});

export const alertSuccess = (title) => {
  return Popup.fire({
    icon: "success",
    title,
  });
};

export const alertCheckout = (title, text) => {
  return Popup.fire({
    icon: "success",
    title,
    text,
    showConfirmButton: true,
    confirmButtonColor: "#0354a5",
    timer: null,
  });
};

export const alertError = (title) => {
  return Popup.fire({
    icon: "error",
    title,
  });
};

export const warningSignout = () => {
  return Swal.fire({
    title: "Bạn có chắc muốn đăng xuất không?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Đồng ý",
    confirmButtonColor: "#0354a5",
    cancelButtonText: "Hủy",
    cancelButtonColor: "#d33",
  });
};

export const warningDeleteUser = () => {
  return Swal.fire({
    title: "Bạn có chắc muốn xóa người dùng này không?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Đồng ý",
    confirmButtonColor: "#0354a5",
    cancelButtonText: "Hủy",
    cancelButtonColor: "#d33",
  });
};

export const warningDeleteMovie = () => {
  return Swal.fire({
    title: "Bạn có chắc muốn xóa phim này không?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Đồng ý",
    confirmButtonColor: "#0354a5",
    cancelButtonText: "Hủy",
    cancelButtonColor: "#d33",
  });
};
