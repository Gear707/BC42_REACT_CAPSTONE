import React from 'react';
import styles from "./AuthLayout.module.scss";
import { Outlet } from "react-router-dom";
import Header from "../../components/Header/Header";

function AuthLayout() {
    return (
        <>
            {/* <Header /> */}
            <div className={styles.background}>
                <div className={styles.container}>
                    <div className={styles.box}>
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    );
}

export default AuthLayout;