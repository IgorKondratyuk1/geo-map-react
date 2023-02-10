import React from 'react';

function PopupContent({popupInfo}) {
    return (
        <div>
            Marker id: {popupInfo.id}
            <br/>
            Radiation level: {popupInfo.radiationLevel}
        </div>
    );
}

export default PopupContent;