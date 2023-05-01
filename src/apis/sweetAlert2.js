import Swal from "sweetalert2";

// Tạo thông báo popup
const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 1000
});

export const alertSuccess = (text) => {
    Toast.fire({
        icon: 'success',
        title: text
    });
};

export const alertError = (text) => {
    Toast.fire({
        icon: 'error',
        title: text
    });
};