import React from 'react';
import {markersType} from "../../dictionariesData";
import {getMarkerLabelName} from "../../helpers/getMarkerPropertyName";
import {Divider} from "antd";

const sortByAlphabet = (paramObj) => {
    return [...paramObj].sort((a, b) => {
        if (a.markerType.label === 'Назва компанії') return -1;
        if (b.markerType.label === 'Назва компанії') return 1;

        if (a.markerType.label > b.markerType.label) return -1;
        else return 1;
        return 0;
    });
}

const getMarkerType = (type) => markersType.find(m => m.value === type);

const valuesParser = (geoValues) => {
    console.log('geo');
    console.log(geoValues);
    let result = [];
    if (geoValues.companyName) { result.push({markerType: {label:"Назва компанії", value: geoValues.companyName}, name: null, value: geoValues.companyName}) }

    const values = Object.keys(geoValues);
    values.forEach((value, index, array) => {
        if (value.match(/MarkName_/)) {
            const [name, number] = value.split('MarkName_');

            array.forEach(elem => {
                let valueName = (name + 'MarkValue_' + number);

                
                if (valueName === elem) {
                    let markerType = getMarkerType(name);
                    result.push({markerType: markerType, name: geoValues[value], value: geoValues[elem]})
                }
            })
        }
    });


    return sortByAlphabet(result);
}

function PinContent({data}) {
    const noTypeFoundStr = 'Параметр не знайдено';
    const formattedGeoValues = valuesParser(data.geoValues);
    const markerType = getMarkerType(data.type);

    return (
        <div>
            ID: {data.id}
            <br/>
            Тип маркера: {markerType.label || noTypeFoundStr}

            <br/>
            {formattedGeoValues.map(elem => {
                let propertyLabel = getMarkerLabelName(elem.markerType.value, elem.name);
                let formattedParamTitle = elem.markerType.label;

                return (
                    <>
                        {formattedParamTitle}: {propertyLabel ? propertyLabel + " = " : ""} {elem.value}
                        <Divider style={{margin: '0px', padding: '0px'}}/>
                    </>
                )
            })}
        </div>
    );
}

export default PinContent;