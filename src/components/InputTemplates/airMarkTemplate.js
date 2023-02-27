import React from 'react';
import {Button, Divider, Form, Input, Select, Space} from "antd";
import {airParams, markersType} from "../../dictionariesData";

const AirInput = ({index}) => {
    return (
        <div>
            <Form.Item
                name={`airMarkName_${index + 1}`}
                label={`Показник повітря ${index + 1}`}
            >
                <Select options={airParams} />
            </Form.Item>
            <Form.Item name={`airMarkValue_${index + 1}`}>
                <Input />
            </Form.Item>
        </div>
    );
};

const AirMarkTemplate = () => {
    const [inputs, setInputs] = React.useState([{value: ""}]);

    const onAddInput = () => {
        const newInputs = [...inputs, {value: ""}];
        setInputs(newInputs);
    }

    return (
        <>
            { inputs.map((input, index) => <AirInput key={index} index={index}/>) }
            <Button onClick={onAddInput}>
                Додати показник повітря
            </Button>
            <Divider />
        </>
    );
};

export default AirMarkTemplate;