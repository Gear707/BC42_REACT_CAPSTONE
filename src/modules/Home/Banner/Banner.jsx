import React, { useEffect, useState } from 'react';
import styles from "./Banner.module.scss";
import { apiGetBanners } from "../../../apis/movieAPI";

function Banner() {
    const [banners, setBanners] = useState([]);
    const [error, setError] = useState(null);

    const getBanners = async () => {
        try {
            const data = await apiGetBanners();
            setBanners(data.content);
        } catch (error) {
            setError(error.response?.data?.content);
        }
    };

    useEffect(() => {
        getBanners();
    }, []);

    if (error) return null;

    // carousel: react slick, react swiper

    return (
        <div style={{ display: "flex" }}>
            {banners.map((item) => {
                return <img key={item.maPhim} src={item.hinhAnh} alt={item.maBanner} height={300} />;
            })}
        </div>
    );
}

export default Banner;