import Map, {
    Marker,
    NavigationControl,
    Popup
} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import React from "react";
import {db} from "../../db";
import CustomMarker from "./CustomMarker/CustomMarker";

const APP_MAP_TOKEN = process.env.REACT_APP_MAP_TOKEN;

function CustomMap() {
    const [popupInfo, setPopupInfo] = React.useState(null);
    const [isTempMarkerShow, setIsTempMarkerShow] = React.useState(false);
    const [markers, setMarkers] = React.useState([]);
    const [tempMarker, setTempMarker] = React.useState({longitude: 30.54, latitude: 50.45});
    const map = React.useRef(null);

    const onLoad = () => {
        setMarkers(db.markers);
    }

    const onMove = ({viewState}) => {
        setTempMarker({longitude: viewState.longitude, latitude: viewState.latitude});
    };

    const addMarker = () => {
        const mapCenter = map.current.getCenter();
        setTempMarker({longitude: mapCenter.lng, latitude: mapCenter.lat});
        setIsTempMarkerShow(true);
    }

    const confirmMarker = () => {
        setMarkers((markers) => [...markers, {id: Date.now(), longitude: tempMarker.longitude, latitude: tempMarker.latitude}]);
        setIsTempMarkerShow(false);
    }

    const hideMarker = () => {
        setIsTempMarkerShow(false);
    }

    const pins = () => markers.map((place, index) => {
        return (
            <Marker key={index}
                    longitude={place.longitude}
                    latitude={place.latitude}
                    anchor="bottom"
                    onClick={e => {
                        e.originalEvent.stopPropagation();
                        setPopupInfo(place);
                    }}
            />
        )
    });

    return (
        <>
            <Map
                ref={map}
                initialViewState={{
                    longitude: 30.54,
                    latitude: 50.45,
                    zoom: 10,
                    bearing: 0
                }}
                onMove={onMove}
                onLoad={onLoad}
                style={{height: "70vh", width: "100%"}}
                mapStyle="mapbox://styles/mapbox/streets-v9"
                mapboxAccessToken={APP_MAP_TOKEN}
                attributionControl={true}
            >
                <NavigationControl />
                {pins()}

                { isTempMarkerShow && <CustomMarker longitude={tempMarker.longitude} latitude={tempMarker.latitude} />}

                {popupInfo && (
                    <Popup
                        anchor="top"
                        longitude={Number(popupInfo.longitude)}
                        latitude={Number(popupInfo.latitude)}
                        onClose={() => setPopupInfo(null)}
                    >
                        <div>
                            {popupInfo.name}
                        </div>
                    </Popup>
                )}
            </Map>

            <button onClick={addMarker}>add marker</button>
            <button onClick={confirmMarker}>confirm</button>
            <button onClick={hideMarker}>hide</button>
        </>
    );
}

export default CustomMap;
