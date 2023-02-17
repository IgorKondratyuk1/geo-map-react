import React from 'react';

function PinContent({data}) {
    const notFoundStr = 'Параметр не знайдено';

    return (
        <div>
            Marker id: {data.id}
            <br/>
            Type: {data.geoValues?.type || notFoundStr}
            <br/>
            Radiation level: {data.geoValues?.radiationLevel || notFoundStr}
        </div>
    );
}

export default PinContent;