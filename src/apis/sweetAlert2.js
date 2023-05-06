import Swal from "sweetalert2";

// Tạo thông báo popup
export const alertSuccess = (text) => {
    return Swal.fire({
        position: "top-end",
        icon: "success",
        title: text,
        showConfirmButton: false,
        timer: 1000,
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