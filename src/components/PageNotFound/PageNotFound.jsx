import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./PageNotFound.module.scss";

function PageNotFound() {
  const navigate = useNavigate();
  return (
    <main className={styles.theme}>
      <div className="text-center wrap-flex-align">
        <div className="col-12">
          <div className={styles.pageContent}>
            <img src="https://file.hstatic.net/200000348419/file/404_1_ff141bafa60e4ed3aef90c7ebdbf54e6.png" />
            <h2>Xin lỗi, chúng tôi không tìm thấy trang mà bạn cần tìm</h2>
            <p>Trở về trang chủ</p>
            <button className="btn btn-danger" onClick={() => navigate("/")}>
              Home
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default PageNotFound;
