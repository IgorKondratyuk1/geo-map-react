import {Button, Col, Row, Space} from "antd";
import React from "react";
import CreateForm from "../../components/ResultForm/CreateForm";
import s from "./MapLayout.module.css";
import {db} from "../../db";
import Map, {Marker, NavigationControl, Popup} from "react-map-gl";
import CustomMarker from "../../components/CustomMap/CustomMarker/CustomMarker";
import PopupContent from "../../components/PopupContent/PopupContent";

const APP_MAP_TOKEN = process.env.REACT_APP_MAP_TOKEN;

export const MapLayout = () => {
    const [isCreateMarkerVisible, setIsCreateMarkerVisible] = React.useState(true);
    const [isConfirmMarkerVisible, setIsConfirmMarkerVisible] = React.useState(false);
    const [isCancelMarkerVisible, setIsCancelMarkerVisible] = React.useState(false);
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    // --- MAP START ---
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
    // --- MAP END ---


    function setBtnsVisibility(createBtn, confirmBtn, cancelBtn) {
        setIsCreateMarkerVisible(createBtn);
        setIsCancelMarkerVisible(cancelBtn);
        setIsConfirmMarkerVisible(confirmBtn);
    }

    function onCancelMarker() {
        setIsTempMarkerShow(false);
        setBtnsVisibility(true, false, false);
    }

    function onAddMarker() {
        const mapCenter = map.current.getCenter();
        setTempMarker({longitude: mapCenter.lng, latitude: mapCenter.lat});
        setIsTempMarkerShow(true);
        setBtnsVisibility(false, true, true);
    }

    function onConfirmMarker() {
        setIsModalOpen(true);
    }

    const onCreate = (values) => {
        alert(JSON.stringify(values));
        setMarkers((markers) => [...markers,
            {id: Date.now(), longitude: tempMarker.longitude, latitude: tempMarker.latitude, radiationLevel: values.radiationLevel}
        ]);
        setIsTempMarkerShow(false);
        setIsModalOpen(false);
        setBtnsVisibility(true, false, false);
    };

    return (
        <>
            <Row>
                <Col span={24}>
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
                        style={{height: "500px", width: "100%"}}
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
                                <PopupContent popupInfo={popupInfo} />
                            </Popup>
                        )}
                    </Map>
                </Col>
            </Row>
            <Row className={s.btnsBlock}>
                <Col span={24}>
                    <Space size={"middle"} align={"start"}>
                        {isCancelMarkerVisible &&
                            <Button onClick={onCancelMarker} danger>Відмнити</Button>
                        }
                        {isConfirmMarkerVisible &&
                            <Button onClick={onConfirmMarker} type="primary">Додати мітку</Button>
                        }
                        {isCreateMarkerVisible &&
                            <Button onClick={onAddMarker} type="primary">Створити мітку</Button>
                        }
                    </Space>
                </Col>
            </Row>

            <CreateForm
                visible={isModalOpen}
                setVisible={setIsModalOpen}
                onCreate={onCreate}
            />
        </>
    )
}

export default MapLayout;