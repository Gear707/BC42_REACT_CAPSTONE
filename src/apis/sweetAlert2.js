import Swal from "sweetalert2";

// Tạo thông báo popup
const Popup = Swal.mixin({
    // toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 1000,
});

export const alertSuccess = (text) => {
    return Popup.fire({
        icon: "success",
        title: text,
    });
};

export const alertError = (text) => {
    return Popup.fire({
        icon: "error",
        title: text,
    });
};

export const warningSignout = () => {
    return Swal.fire({
        title: "Bạn có chắc muốn đăng xuất không?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Đồng ý",
        confirmButtonColor: "#3085d6",
        cancelButtonText: "Hủy",
        cancelButtonColor: "#d33",
    });
};