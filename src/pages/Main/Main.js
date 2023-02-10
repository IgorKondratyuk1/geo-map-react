import {Layout, theme} from 'antd';
import {MapLayout} from "../../Layouts/MapLayout/MapLayout";
import s from "./MainPage.module.css";
import CustomHeader from "../../components/CustomHeader/CustomHeader";
import CustomFooter from "../../components/CustomFooter/CustomFooter";
const { Content, Footer } = Layout;


const MainPage = () => {
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
                    <MapLayout />
                </div>
            </Content>
            {/*<CustomFooter />*/}
        </Layout>
    );
}

export default MainPage;