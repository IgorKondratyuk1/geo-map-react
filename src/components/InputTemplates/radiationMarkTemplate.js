import React from 'react';
import {Form, Input} from "antd";

const RadiationMarkTemplate = () => (
    <>
        <Form.Item
            label="Оцінка радіації"
            name="radiationMark"
            rules={[
                { required: true, message: "Please input the value!" }
            ]}
        >
            <Input />
        </Form.Item>
    </>
);

export default RadiationMarkTemplate;