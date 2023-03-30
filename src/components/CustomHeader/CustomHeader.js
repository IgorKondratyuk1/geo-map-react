import React from 'react';
import planetImg from "../../assets/icons/planet-earth.png";
import s from "./CustomHeader.module.css"
import {Header} from "antd/es/layout/layout";

function CustomHeader(props) {
    return (
        <Header className={s.header}>
            <div className={s.logoContainer}>
                <img className={s.logo} src={planetImg} />
            </div>
            <div className={s.logoName}>Geo Map</div>
        </Header>
    );
}

export default CustomHeader;