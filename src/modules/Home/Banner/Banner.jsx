import React, { useEffect, useState } from 'react';
import styles from "./Banner.module.scss";
import Slider from "react-slick";
import "./slickCustom.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { apiGetBanners } from "../../../apis/movieAPI";

function Banner() {
    const [banners, setBanners] = useState([]);
    const [error, setError] = useState(null);

    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        speed: 500,
        autoplaySpeed: 5 * 1000,
        adaptiveHeight: true
    };

    const getBanners = async () => {
        try {
            const data = await apiGetBanners();
            setBanners(data.content);
        } catch (error) {
            setError(error?.response?.data?.content);
        }
    };

    useEffect(() => {
        getBanners();
    }, []);

    if (error) return null;

    return (
        <Slider {...settings} className={styles.bannerContainer}>
            {banners.map((item) => {
                return (
                    <div key={item.maPhim} className={styles.bannerItem}>
                        <img src={item.hinhAnh} alt={item.maBanner}
                            className={`img-fluid ${styles.bannerImg}`} />
                    </div>
                );
            })}
        </Slider>
    );
}

export default Banner;