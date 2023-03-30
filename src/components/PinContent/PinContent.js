import React from 'react';
import {markersType} from "../../dictionariesData";
import {getMarkerLabelName} from "../../helpers/getMarkerPropertyName";
import {Button, Card, Space, Typography} from "antd";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {showAddMarkerDataPopup, } from "../../redux/slices/popupsSlice";
import {changeMarkerType, } from "../../redux/slices/tempMarkerSlice";
import {setUpdatingMarkerId} from "../../redux/slices/indicatorsFormSlice";

const NOT_FOUND_PARAM_STR = 'Параметр не знайдено';
const getMarkerType = (type) => markersType.find(m => m.value === type);


const getFormattedValues = (indicator, i) => {
    const geoValues = indicator.geoValues;

    return (
        <Card key={indicator.id} style={{margin: '5px 0px'}} bodyStyle={{padding: '10px'}}>
            <Typography style={{textAlign: 'center'}}>Дані № {i+1}</Typography>
            <div>Дата збору: {indicator.createdAt}</div>

            {
                geoValues.map((geoValue, index) => {
                    let selectedItemTitle = geoValue.selectedItem ? getMarkerLabelName(geoValue.type, geoValue.selectedItem) + " = " : "";
                    let typeTitle = getMarkerType(geoValue.type).label || NOT_FOUND_PARAM_STR;

                    return (
                        <div key={index}>
                            <div>{typeTitle}: {selectedItemTitle} {geoValue.value}</div>
                        </div>
                    )
                })
            }
        </Card>
    )
}

function PinContent({data}) {
    const dispatch = useDispatch();
    const markerType = getMarkerType(data.type);
    const navigate = useNavigate();

    const onMarkerInfo = () => {navigate('/markers/' + data.id)}
    const onAddData = (id, markerType) => {
        dispatch(setUpdatingMarkerId(id))
        dispatch(changeMarkerType(markerType));
        dispatch(showAddMarkerDataPopup());
    }

    return (
        <>
            <div>
                ID: {data.id ? data.id : NOT_FOUND_PARAM_STR}
                <br/>
                Дата створення: {data.createdAt ? data.createdAt.split('.')[0] : NOT_FOUND_PARAM_STR}
                <br/>
                Підсистема: {markerType.label || NOT_FOUND_PARAM_STR}
                <br/>
                { data.indicators.map((indicator, i) => getFormattedValues(indicator, i)) }
                <br/>
                <div style={{display:"flex", flexDirection: "row", justifyContent: "space-between"}}>
                    <Button onClick={(e) => {onAddData(data.id, data.type)}}>Додати дані</Button>
                    <Button onClick={onMarkerInfo}>Інформація</Button>
                </div>
            </div>
        </>
    );
}

export default PinContent;