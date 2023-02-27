import React from 'react';
import {markersType} from "../../dictionariesData";

const formatGroupTitle = (name) => {
    if (name) return "Оцінка " + name.toLocaleLowerCase();
    return 'Оцінка показника';
}

const getMarkerTypeTitle = (type) => {
    const result = markersType.find(m => m.value === type);
    return result?.label || null;
}

const valuesParser = (geoValues) => {
    let result = [];
    if (geoValues.companyName) { result.push({groupTitle: "Назва компанії", name: null, value: geoValues.companyName}) }
    if (geoValues.soilMark) { result.push({groupTitle: "Оцінка грунту", name: null, value: geoValues.soilMark}) }

    const values = Object.keys(geoValues);
    values.forEach((value, index, array) => {
        if (value.match(/MarkName_/)) {
            const [name, number] = value.split('MarkName_');

            array.forEach(elem => {
                let valueName = (name + 'MarkValue_' + number);
                let groupTitle = getMarkerTypeTitle(name);
                let formattedGroupTitle = formatGroupTitle(groupTitle)
                if (valueName === elem) { result.push({groupTitle: formattedGroupTitle, name: geoValues[value], value: geoValues[elem]}) }
            })
        }
    });


    return result;
}

function PinContent({data}) {
    const noTypeFoundStr = 'Параметр не знайдено';

    return (
        <div>
             ID: {data.id}
            <br/>
            Тип маркера: {getMarkerTypeTitle(data.type) || noTypeFoundStr}
            <br/>
            {valuesParser(data.geoValues).map(elem => {
                return (
                    <>
                        {elem.groupTitle}: {elem.name ? elem.name + " = " : ""}  {elem.value}
                        <br/>
                    </>
                )
            })}
        </div>
    );
}

export default PinContent;