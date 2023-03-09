import React, {useEffect} from 'react';
import {Divider, Form, Input} from "antd";
import InputTemplate from "./InputTemplate";
import {airParams, radiationParams, soilParams, waterParams} from "../../dictionariesData";
import {useDispatch} from "react-redux";
import {addGeoValue, changeGeoValueInput} from "../../redux/slices/indicatorsFormSlice";
import {v4 as uuidv4} from "uuid";

const CompanyMarkTemplate = () => {
    const COMPANY_TYPE_VALUE = 'company';
    const dispatch = useDispatch();
    const id = uuidv4();

    const onInputChange = (e) => {
        dispatch(changeGeoValueInput({value: e.target.value, id}));
    }

    useEffect(() => {
        const newInputObject = {id, type: COMPANY_TYPE_VALUE, selectedItem: "", value: ""};
        dispatch(addGeoValue(newInputObject));
    }, [])

    return (
        <>
            <Form.Item
                label="Назва компанії"
                name="companyName"
                rules={[
                    { required: true, message: "Please input the value!" }
                ]}
            >
                <Input onChange={onInputChange} />
            </Form.Item>
            <Divider />
            <InputTemplate selectParams={waterParams} markTypeName={'Водний'} markTypeValue={'water'} />
            <InputTemplate selectParams={soilParams} markTypeName={'Грунтовий'} markTypeValue={'soil'} />
            <InputTemplate selectParams={radiationParams} markTypeName={'Радіаційний'} markTypeValue={'radiation'} />
            <InputTemplate selectParams={airParams} markTypeName={'Повітряний'} markTypeValue={'air'} />
        </>
    );
}

export default CompanyMarkTemplate;