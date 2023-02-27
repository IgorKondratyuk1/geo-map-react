import React from 'react';
import {Divider, Form, Input} from "antd";
import WaterMarkTemplate from "./waterMarkTemplate";
import SoilMarkTemplate from "./soilMarkTemplate";
import RadiationMarkTemplate from "./radiationMarkTemplate";
import AirMarkTemplate from "./airMarkTemplate";

const CompanyMarkTemplate = () => (
    <>
        <Form.Item
            label="Назва компанії"
            name="companyName"
            rules={[
                { required: true, message: "Please input the value!" }
            ]}
        >
            <Input />
        </Form.Item>
        <Divider />
        <WaterMarkTemplate />
        <SoilMarkTemplate />
        <RadiationMarkTemplate />
        <AirMarkTemplate />
    </>
);

export default CompanyMarkTemplate;