import {Layout, theme} from 'antd';
import {MapLayout} from "../../Layouts/MapLayout/MapLayout";
import s from "./MainPage.module.css";
import CustomHeader from "../../components/CustomHeader/CustomHeader";
const { Content } = Layout;


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
        </Layout>
    );
}

export default MainPage;