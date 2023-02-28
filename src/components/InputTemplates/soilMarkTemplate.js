import React from 'react';
import {Button, Divider, Form, Input, Select} from "antd";
import {soilParams} from "../../dictionariesData";

const SoilInput = ({index}) => {
    return (
        <div>
            <Form.Item
                name={`soilMarkName_${index + 1}`}
                label={`Оцінка грунту ${index + 1}`}
            >
                <Select options={soilParams} />
            </Form.Item>
            <Form.Item name={`soilMarkValue_${index + 1}`}>
                <Input />
            </Form.Item>
        </div>
    );
};

const SoilMarkTemplate = () => {
    const [inputs, setInputs] = React.useState([{value: ""}]);

    const onAddInput = () => {
        const newInputs = [...inputs, {value: ""}];
        setInputs(newInputs);
    }

    return (
        <>
            {inputs.map((input, index) => <SoilInput key={index} index={index}/>)}
            <Button onClick={onAddInput}>
                Додати показник грунту
            </Button>
            <Divider/>
        </>
    )
};

export default SoilMarkTemplate;