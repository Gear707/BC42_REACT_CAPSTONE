import React from 'react';
import { Outlet } from "react-router-dom";
import Header from "../../components/Header/Header";
import styles from "./AuthLayout.module.scss";

function AuthLayout() {
    return (
        <>
            <Header />
            <div className={styles.background}>
                <div className="container">
                    <div className="row justify-content-center">
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    );
}

export default AuthLayout;