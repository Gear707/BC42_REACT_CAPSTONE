import Swal from "sweetalert2";

// Tạo thông báo popup
const Popup = Swal.mixin({
    // toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 1000
});

export const alertSuccess = (text) => {
    Popup.fire({
        icon: 'success',
        title: text,
    });
};