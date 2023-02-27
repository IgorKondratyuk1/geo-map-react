import React from 'react';

const valuesParser = (geoValues) => {
    let result = [];
    if (geoValues.soilMark) { result.push({name: "Грунт", value: geoValues.soilMark}) }
    if (geoValues.companyName) { result.push({name: "Назва компанії", value: geoValues.companyName}) }

    const values = Object.keys(geoValues);
    values.forEach((value, index, array) => {
        console.log(value);

        if (value.match(/MarkName_/)) {
            const [name, number] = value.split('MarkName_');

            array.forEach(elem => {
                const valueName = (name + 'MarkValue_' + number);
                if (valueName === elem) { result.push({name: geoValues[value], value: geoValues[elem]}) }
            })
        }
    });


    return result
}

function PinContent({data}) {
    console.log(data);
    const notFoundStr = 'Параметр не знайдено';

    return (
        <div>
            Marker id: {data.id}
            <br/>
            Type: {data.type || notFoundStr}
            <br/>
            {valuesParser(data.geoValues).map(elem => {
                return (
                    <>
                        {elem.name} : {elem.value}
                        <br/>
                    </>
                )
            })}
        </div>
    );
}

export default PinContent;