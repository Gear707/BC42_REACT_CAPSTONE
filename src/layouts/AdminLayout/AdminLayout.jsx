import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import styles from "./AdminLayout.module.scss";
// import { apiGetUserList } from "../../apis/userAPI";
import { useSelector } from "react-redux";
function AdminLayout() {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  return (
    <div className={styles.theme}>
      <div className="row">
        {/* <h1>AdminLayout</h1>
      <Outlet /> */}
        <div className={`col-2 text-center ${styles.background}`}>
          <img
            className={styles.logo}
            src="https://i.imgur.com/lC22izJ.png"
            alt=""
            srcset=""
          />
          <button className={styles.user} onClick={() => navigate("./users")}>
            <i class="fa-solid fa-user"></i>
            Người dùng
          </button>
          <button className="btn" onClick={() => navigate("./movies")}>
            <i class="fa-solid fa-film me-2"></i>
            Phim
          </button>
        </div>
        <div className="col-10 bg-light">
          <div className="bg-white mt-5">
            <div className="d-flex justify-content-end me-3">
              <img
                className={styles.avatarUser}
                src="https://i.pravatar.cc/300?u=abc123"
                alt=""
              />
              <span className={styles.accountUser}>{user.taiKhoan}</span>
            </div>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
