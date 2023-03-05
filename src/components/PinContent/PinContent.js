import React from 'react';
import {markersType} from "../../dictionariesData";
import {getMarkerLabelName} from "../../helpers/getMarkerPropertyName";
import {Divider} from "antd";

const NOT_FOUND_PARAM_STR = 'Параметр не знайдено';
const getMarkerType = (type) => markersType.find(m => m.value === type);


const getFormattedValues = (indicator) => {
    const geoValues = indicator.geoValues;

    return (
        <>
            {
                geoValues.map(geoValue => {
                    let selectedItemTitle = geoValue.selectedItem ? getMarkerLabelName(geoValue.type, geoValue.selectedItem) + " = " : "";
                    let typeTitle = getMarkerType(geoValue.type).label || NOT_FOUND_PARAM_STR;

                    return (
                        <>
                            {typeTitle}: {selectedItemTitle} {geoValue.value}
                            <br/>
                            <Divider style={{margin: '0px', padding: '0px'}}/>
                        </>
                    )
                })
            }
        </>
    )
}

function PinContent({data}) {

    const markerType = getMarkerType(data.type);

    return (
        <div>
            ID: {data.id ? data.id.split('-')[0] : NOT_FOUND_PARAM_STR}
            <br/>
            Дата створення: {data.createdAt ? data.createdAt.split('.')[0] : NOT_FOUND_PARAM_STR}
            <br/>
            Тип маркера: {markerType.label || NOT_FOUND_PARAM_STR}
            <br/>
            { data.indicators.map(getFormattedValues)}
        </div>
    );
}

export default PinContent;


// const sortByAlphabet = (paramObj) => {
//     return [...paramObj].sort((a, b) => {
//         if (a.markerType.label === 'Назва підприємства') return -1;
//         if (b.markerType.label === 'Назва підприємства') return 1;
//
//         if (a.markerType.label > b.markerType.label) return -1;
//         else return 1;
//         return 0;
//     });
// }


// const valuesParser = (geoValues) => {
//     console.log('geo');
//     console.log(geoValues);
//     let result = [];
//     if (geoValues.companyName) { result.push({markerType: {label:"Назва підприємства", value: geoValues.companyName}, name: null, value: geoValues.companyName}) }
//
//     const values = Object.keys(geoValues);
//     values.forEach((value, index, array) => {
//         if (value.match(/MarkName_/)) {
//             const [name, number] = value.split('MarkName_');
//
//             array.forEach(elem => {
//                 let valueName = (name + 'MarkValue_' + number);
//
//
//                 if (valueName === elem) {
//                     let markerType = getMarkerType(name);
//                     result.push({markerType: markerType, name: geoValues[value], value: geoValues[elem]})
//                 }
//             })
//         }
//     });
//
//
//     return sortByAlphabet(result);
// }