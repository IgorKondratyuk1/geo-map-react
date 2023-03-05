import React from 'react';
import {Button, Divider, Form, Input, Select} from "antd";
import {airParams} from "../../dictionariesData";
import {useDispatch} from "react-redux";
import {addGeoValue, changeGeoValueInput, changeGeoValueSelect} from "../../redux/slices/indicatorsFormSlice";
import {v4 as uuidv4} from "uuid";

const AirInput = ({index, id}) => {
    const dispatch = useDispatch();

    const onSelectChange = (e) => {
        dispatch(changeGeoValueSelect({selectedItem: e, id}));
    }

    const onInputChange = (e) => {
        dispatch(changeGeoValueInput({value: e.target.value, id}));
    }

    return (
        <div>
            <Form.Item
                id={id}
                name={`airMarkName_${index + 1}`}
                label={`Показник повітря ${index + 1}`}
            >
                <Select options={airParams} onChange={onSelectChange}/>
            </Form.Item>
            <Form.Item name={`airMarkValue_${index + 1}`}>
                <Input onChange={onInputChange} />
            </Form.Item>
        </div>
    );
};

const AirMarkTemplate = () => {
    const [inputs, setInputs] = React.useState([]);
    const dispatch = useDispatch();
    const MARKER_TYPE = 'air';

    const onAddInput = () => {
        const id = uuidv4();
        const newInputObject = {id, type: MARKER_TYPE, selectedItem: "", value: ""};

        dispatch(addGeoValue(newInputObject));
        setInputs([...inputs, newInputObject]);
    }

    React.useEffect(() => {
        console.log('a');
        onAddInput();
    }, []);

    return (
        <>
            { inputs.map((input, index) => <AirInput key={index} index={index} id={input.id} markerType={MARKER_TYPE}/>) }
            <Button onClick={onAddInput}>
                Додати показник повітря
            </Button>
            <Divider />
        </>
    );
};

export default AirMarkTemplate;