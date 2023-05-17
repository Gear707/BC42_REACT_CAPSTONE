import React from "react";
import styles from "./Showtimes.module.scss";

function HeThongRap({ heThongRap }) {
  return (
    <div>
      <div className={styles.heThongRap}>
        <img
          className={styles.logo}
          src={heThongRap.logo}
          alt={heThongRap.maHeThongRap}
        />
      </div>
    </div>
  );
}

export default HeThongRap;
