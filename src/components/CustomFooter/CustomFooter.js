import React from 'react';
import s from "./CustomFooter.module.css";
import {Footer} from "antd/es/layout/layout";

function CustomFooter() {
    return (
        <Footer className={s.footer}>
            TR-23MP App
        </Footer>
    );
}

export default CustomFooter;