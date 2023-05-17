import React from 'react';
import { Outlet } from "react-router-dom";
import Header from "../../components/Header/Header";
import styles from "./UserLayout.module.scss";

function UserLayout() {
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

export default UserLayout;