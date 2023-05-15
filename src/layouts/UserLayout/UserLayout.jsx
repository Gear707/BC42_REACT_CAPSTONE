import React from 'react';
import { Outlet } from "react-router-dom";
import Header from "../../components/Header/Header";
import styles from "./UserLayout.module.scss";

function UserLayout() {
    return (
        <>
            <Header />
            <div className={styles.background}>
                <div className="container px-4 py-5">
                    <div className="row justify-content-center">
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    );
}

export default UserLayout;