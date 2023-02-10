import {Button, Col, Row, Space} from "antd";
import Map from "../../components/Map/Map";
import React from "react";
import CreateForm from "../../components/ResultForm/CreateForm";
import s from "./MapLayout.module.css";

export const MapLayout = () => {
    const [isCreateMarkerVisible, setIsCreateMarkerVisible] = React.useState(true);
    const [isConfirmMarkerVisible, setIsConfirmMarkerVisible] = React.useState(false);
    const [isCancelMarkerVisible, setIsCancelMarkerVisible] = React.useState(false);
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    function setBtnsVisibility(createBtn, confirmBtn, cancelBtn) {
        setIsCreateMarkerVisible(createBtn);
        setIsCancelMarkerVisible(cancelBtn);
        setIsConfirmMarkerVisible(confirmBtn);
    }

    function onCancelMarker() {
        setBtnsVisibility(true, false, false);
    }

    function onAddMarker() {
        setBtnsVisibility(false, true, true);
    }

    function onConfirmMarker() {
        setIsModalOpen(true);
    }

    const onCreate = (values) => {
        alert(JSON.stringify(values));
        setIsModalOpen(false);
        setBtnsVisibility(true, false, false);
    };

    return (
        <>
            <Row>
                <Col span={24}>
                    <Map />
                </Col>
            </Row>
            <Row className={s.btnsBlock}>
                <Col span={24}>
                    <Space size={"middle"} align={"start"}>
                        {isCancelMarkerVisible &&
                            <Button onClick={onCancelMarker} danger>Відмнити</Button>
                        }
                        {isConfirmMarkerVisible &&
                            <Button onClick={onConfirmMarker} type="primary">Додати мітку</Button>
                        }
                        {isCreateMarkerVisible &&
                            <Button onClick={onAddMarker} type="primary">Створити мітку</Button>
                        }
                    </Space>
                </Col>
            </Row>


            <CreateForm
                visible={isModalOpen}
                setVisible={setIsModalOpen}
                onCreate={onCreate}
            />
        </>
    )
}

export default MapLayout;