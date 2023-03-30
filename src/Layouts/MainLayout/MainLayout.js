import {Layout, theme} from "antd";
import CustomHeader from "../../components/CustomHeader/CustomHeader";
import s from "./MainLayout.module.css";
import {Outlet} from "react-router-dom";
import {Content} from "antd/es/layout/layout";

export const MainLayout = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <Layout>
            <CustomHeader />
            <Content
                className="site-layout"
                className={s.content}
            >
                <div
                    className={s.contentContainer}
                    style={{background: colorBgContainer,}}
                >
                    <Outlet></Outlet>
                </div>
            </Content>
        </Layout>
    );
}