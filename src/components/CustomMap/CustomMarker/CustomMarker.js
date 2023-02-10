import {Marker} from "react-map-gl";
import React from "react";

function CustomMarker(props) {
    const [marker, setMarker] = React.useState({longitude: props.longitude, latitude: props.latitude});

    React.useEffect(() => {
        setMarker({longitude: props.longitude, latitude: props.latitude});
    }, [props]);

    const onMarkerDragEnd = (event) => {
        setMarker({longitude: event.lngLat.lng, latitude: event.lngLat.lat});
    };

    return (
        <Marker
            longitude={marker.longitude}
            latitude={marker.latitude}
            onDragEnd={onMarkerDragEnd}
            color="red"
            anchor="bottom"
            draggable
        />
    )
}

export default CustomMarker;