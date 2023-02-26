import React from 'react';
import {Form, Input} from "antd";

const SoilMarkTemplate = () => (
    <>
        <Form.Item
            label="Оцінка грунту"
            name="soilMark"
            rules={[
                { required: true, message: "Please input the value!" }
            ]}
        >
            <Input />
        </Form.Item>
    </>
);

export default SoilMarkTemplate;