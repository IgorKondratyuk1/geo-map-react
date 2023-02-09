import {Button, Col, Modal, Row} from "antd";
import Map from "../../components/Map/Map";
import React from "react";
import CreateForm from "../../components/ResultForm/CreateForm";

export const MapLayout = () => {
    const [isCreateMarkerVisible, setIsCreateMarkerVisible] = React.useState(true);
    const [isConfirmMarkerVisible, setIsConfirmMarkerVisible] = React.useState(false);
    const [isCancelMarkerVisible, setIsCancelMarkerVisible] = React.useState(false);
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        alert('ok');
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    function onCancelMarker() {
        setIsCreateMarkerVisible(true);
        setIsCancelMarkerVisible(false);
        setIsConfirmMarkerVisible(false);
    }

    function onAddMarker() {
        setIsCreateMarkerVisible(false);
        setIsCancelMarkerVisible(true);
        setIsConfirmMarkerVisible(true);
    }

    function onConfirmMarker() {
        setIsModalOpen(true);
    }

    const onCreate = (values) => {
        alert(JSON.stringify(values));
    };

    return (
        <>
            <Row>
                <Col span={24}>
                    <Map />
                </Col>
            </Row>
            <Row justify="end" gutter={[16, 16]}>
                <Col span={4}>
                    {isCancelMarkerVisible &&
                        <Button onClick={onCancelMarker} danger>Відмнити</Button>
                    }
                </Col>
                <Col span={4}>
                    {isConfirmMarkerVisible &&
                        <Button onClick={onConfirmMarker} type="primary">Додати мітку</Button>
                    }
                </Col>
                <Col span={4}>
                    {isCreateMarkerVisible &&
                        <Button onClick={onAddMarker} type="primary">Створити мітку</Button>
                    }
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