import React from 'react';

function CustomIcon({iconLogo}) {
    return (
        <img src={iconLogo} style={{padding: '1px', maxWidth: '20px'}}/>
    );
}

export default CustomIcon;