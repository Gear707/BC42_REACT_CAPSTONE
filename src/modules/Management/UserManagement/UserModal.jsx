// import React, { useEffect, useState } from "react";
// import { Button, Modal } from "react-bootstrap";

// function UserModal(onShow, onClose, selectedUser) {
//   // state show modal
//   //   const [show, setShow] = useState(false);
//   // state quản lý người dùng đang được chọn
//   //   const [selectedUser, setSelectedUser] = useState({});

//   // hàm đóng mở modal
//   //   const handleClose = () => setShow(false);
//   //   const handleShow = () => {
//   //     setShow(true);
//   //     setSelectedUser(user);
//   //   };

//   return (
//     <>
//       <Modal onHide={onClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>Chỉnh sửa thông tin người dùng</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <form action="" className="form-group">
//             <div className="">
//               <p>Họ tên</p>
//               <input
//                 type="text"
//                 className="form-control"
//                 value={selectedUser?.taiKhoan}
//               />
//             </div>

//             <div className="">
//               <p>Tài khoản</p>
//               <input type="text" className="form-control" />
//             </div>

//             <div className="">
//               <p>Mật khẩu</p>
//               <input type="text" className="form-control" />
//             </div>

//             <div className="">
//               <p>Email</p>
//               <input type="text" className="form-control" />
//             </div>

//             <div className="">
//               <p>Số điện thoại</p>
//               <input type="text" className="form-control" />
//             </div>

//             <div className="form-group">
//               <p>Người dùng</p>
//               <select className="form-control" name="" id="">
//                 <option selected value="">
//                   Khách hàng
//                 </option>
//                 <option value="">Quản trị</option>
//               </select>
//             </div>
//           </form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="primary">Cập nhật</Button>
//           <Button variant="danger">Hủy</Button>
//         </Modal.Footer>
//       </Modal>
//     </>
//   );
// }

// export default UserModal;
// // onClick={handleClose}
