import React from 'react';
import {Modal, Select} from "antd";

const markerDefaultValues = [
    { value: '1', label: 'CH1' },
    { value: '2', label: 'CH2' },
    { value: '3', label: 'CH3' },
    { value: '4', label: 'CH4' },
];

function MarkerTypePopup(props) {
    const {visible, setVisible, onCancel, onOk} = props;

    const handleOk = () => {
        onOk();
        setVisible(false);
    };

    const handleCancel = () => {
        onCancel();
        setVisible(false);
    };

    const handleSelectChange = (value) => {
        console.log(`selected ${value}`);
    };

    return (
        <Modal title="Тип маркеру" open={visible} onOk={handleOk} onCancel={handleCancel}>
            <p>Some contents...</p>
            <Select
                defaultValue={markerDefaultValues[0]}
                style={{ width: '100%' }}
                onChange={handleSelectChange}
                placeholder="Оберіть тип маркеру"
                options={markerDefaultValues}
            />
        </Modal>
    );
}

export default MarkerTypePopup;