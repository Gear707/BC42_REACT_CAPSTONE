import React from "react";
import { Outlet } from "react-router-dom";

function AdminLayout() {
  return (
    <div className="row">
      {/* <h1>AdminLayout</h1>
      <Outlet /> */}
      <div className="col-2">
        <img src="https://i.imgur.com/lC22izJ.png" alt="" srcset="" />
        <div>
          <i class="fa-solid fa-user"></i>
          Người dùng
        </div>
        <div>
          <i class="fa-solid fa-film"></i>
          Phim
        </div>
      </div>
      <div className="col-10"></div>
    </div>
  );
}

export default AdminLayout;
