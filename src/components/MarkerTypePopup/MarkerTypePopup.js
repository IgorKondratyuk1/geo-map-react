import React, {useEffect} from 'react';
import {Modal, Select} from "antd";
import {markersType} from "../../tempData";
import {useDispatch, useSelector} from "react-redux";
import {changeMarkerType} from "../../redux/slices/tempMarkerSlice";

function MarkerTypePopup(props) {
    const {visible, setVisible, onCancel, onOk} = props;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(changeMarkerType(markersType[0].value));
    }, []);

    const handleOk = () => {
        onOk();
        setVisible(false);
    };

    const handleCancel = () => {
        onCancel();
        setVisible(false);
    };

    const handleSelectChange = (value) => {
        dispatch(changeMarkerType(value));
    };

    return (
        <Modal title="Тип маркеру" open={visible} onOk={handleOk} onCancel={handleCancel}>
            <Select
                defaultValue={markersType[0]}
                style={{ width: '100%' }}
                onChange={handleSelectChange}
                placeholder="Оберіть тип маркеру"
                options={markersType}
            />
        </Modal>
    );
}

export default MarkerTypePopup;