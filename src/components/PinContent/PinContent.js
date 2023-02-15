import React from 'react';

function PinContent({data}) {
    return (
        <div>
            Marker id: {data.id}
            <br/>
            Type: {data.geoValues.type}
            <br/>
            Radiation level: {data.geoValues.radiationLevel}
        </div>
    );
}

export default PinContent;