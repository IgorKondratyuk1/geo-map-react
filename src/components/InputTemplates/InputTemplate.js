import React from 'react';
import {Button, Divider, Form, Input, Select} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {addGeoValue, changeGeoValueInput, changeGeoValueSelect} from "../../redux/slices/indicatorsFormSlice";
import {v4 as uuidv4} from "uuid";

const InputGroup = ({id, index, markTypeName, markerTypeValue, selectParams }) => {
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
                name={`${markerTypeValue}MarkName_${index + 1}`}
                label={`Маркер ${markTypeName} ${index + 1}`}
            >
                <Select options={selectParams} onChange={onSelectChange}/>
            </Form.Item>
            <Form.Item name={`${markerTypeValue}MarkValue_${index + 1}`}>
                <Input onChange={onInputChange} />
            </Form.Item>
        </div>
    );
};

const MarkTemplate = ({markTypeName, markTypeValue, selectParams}) => {
    const inputs = useSelector((state) => state.indicatorsForm.geoValues);
    const dispatch = useDispatch();

    const onAddInput = () => {
        const id = uuidv4();
        const newInputObject = {id, type: markTypeValue, selectedItem: "", value: ""};

        dispatch(addGeoValue(newInputObject));
    }

    return (
        <div>
            { inputs.map((input, index) => {
                if (input.type === markTypeValue) {
                    return (
                        <InputGroup key={index}
                                    id={input.id}
                                    index={index}
                                    markTypeName={markTypeName}
                                    markerTypeValue={markTypeValue}
                                    selectParams={selectParams} />
                    )
                }
            })
            }
            <Button onClick={onAddInput}>
                Додати маркер {markTypeName}
            </Button>
            <Divider />
        </div>
    );
};

export default MarkTemplate;