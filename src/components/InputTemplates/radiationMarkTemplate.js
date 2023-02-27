import React from 'react';
import {Button, Divider, Form, Input, Select} from "antd";
import {radiationParams} from "../../dictionariesData";

const RadiationInput = ({index}) => {
    return (
        <div>
            <Form.Item
                name={`radiationMarkName_${index + 1}`}
                label={`Оцінка радіації ${index + 1}`}
            >
                <Select options={radiationParams} />
            </Form.Item>
            <Form.Item name={`radiationMarkValue_${index + 1}`}>
                <Input />
            </Form.Item>
        </div>
    );
};

const RadiationMarkTemplate = () => {
    const [inputs, setInputs] = React.useState([{value: ""}]);

    const onAddInput = () => {
        const newInputs = [...inputs, {value: ""}];
        setInputs(newInputs);
    }

    return (
        <>
            { inputs.map((input, index) => <RadiationInput key={index} index={index}/>) }
            <Button onClick={onAddInput}>
                Додати показник радіації
            </Button>
            <Divider />
        </>
    )
};

export default RadiationMarkTemplate;