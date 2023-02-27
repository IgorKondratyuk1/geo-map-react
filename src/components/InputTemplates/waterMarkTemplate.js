import React from 'react';
import {Button, Divider, Form, Input, Select} from "antd";
import {waterParams} from "../../dictionariesData";

const WaterInput = ({index}) => {
    return (
        <div>
            <Form.Item
                name={`waterMarkName_${index + 1}`}
                label={`Оцінка води ${index + 1}`}
            >
                <Select options={waterParams} />
            </Form.Item>
            <Form.Item name={`waterMarkValue_${index + 1}`}>
                <Input />
            </Form.Item>
        </div>
    );
};

const WaterMarkTemplate = () => {
    const [inputs, setInputs] = React.useState([{value: ""}]);

    const onAddInput = () => {
        const newInputs = [...inputs, {value: ""}];
        setInputs(newInputs);
    }

    return (
        <>
            { inputs.map((input, index) => <WaterInput key={index} index={index}/>) }
            <Button onClick={onAddInput}>
                Додати показник води
            </Button>
            <Divider />
        </>
    );
}

export default WaterMarkTemplate;