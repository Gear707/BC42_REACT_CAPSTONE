import React from 'react';
import styles from "./Loading.module.scss";

function Loading() {
    return (
        <div className={styles.loaderContainer}>
            <div className={styles.spinner}></div>
        </div>
    );
}

export default Loading;