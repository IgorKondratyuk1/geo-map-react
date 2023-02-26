import React from 'react';
import {Form, Input} from "antd";

const WaterMarkTemplate = () => (
    <>
        <Form.Item
            label="Оцінка води"
            name="waterMark"
            rules={[
                { required: true, message: "Please input the value!" }
            ]}
        >
            <Input />
        </Form.Item>
    </>
);

export default WaterMarkTemplate;