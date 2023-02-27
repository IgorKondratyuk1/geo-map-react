import {Button, Col, Row, Space} from "antd";
import React from "react";
import s from "./MapLayout.module.css";
import Map, {Marker, NavigationControl, Popup} from "react-map-gl";
import CustomMarker from "../../components/CustomMap/CustomMarker/CustomMarker";
import MarkerTypePopup from "../../components/MarkerTypePopup/MarkerTypePopup";
import FillingPopup from "../../components/FillingPopup/FillingPopup";
import PinContent from "../../components/PinContent/PinContent";
import {addMarkers, addOneMarker} from "../../redux/slices/markersSlice";
import {useDispatch, useSelector} from "react-redux";
import {api} from "../../api/api";
import {detectMarkerColor} from "../../helpers/detectMarkerColor";

const APP_MAP_TOKEN = process.env.REACT_APP_MAP_TOKEN;

export const MapLayout = () => {
    const dispatch = useDispatch();
    const markers = useSelector((state) => state.markers);
    const markerType = useSelector((state) => state.tempMarker.markerType);

    const [isCreateMarkerVisible, setIsCreateMarkerVisible] = React.useState(true);
    const [isConfirmMarkerVisible, setIsConfirmMarkerVisible] = React.useState(false);
    const [isCancelMarkerVisible, setIsCancelMarkerVisible] = React.useState(false);
    const [isFillingModalOpen, setIsFillingModalOpen] = React.useState(false);
    const [isMarkerTypeModalOpen, setIsMarkerTypeModalOpen] = React.useState(false);

    // --- Map start ---
    const [pinInfo, setPinInfo] = React.useState(null);
    const [isTempMarkerShow, setIsTempMarkerShow] = React.useState(false);
    const [tempMarker, setTempMarker] = React.useState({longitude: 30.54, latitude: 50.45});
    const map = React.useRef(null);


    const onLoad = async () => {
        await loadMarkersData();
    }

    const onMove = ({viewState}) => {
        setTempMarker({longitude: viewState.longitude, latitude: viewState.latitude});
    };

    const pins = () => markers.map((marker, index) => {
        const color = detectMarkerColor(marker.type);
        return (
            <Marker key={index}
                    longitude={marker.longitude}
                    latitude={marker.latitude}
                    anchor="bottom"
                    color={color}
                    onClick={e => {
                        e.originalEvent.stopPropagation();
                        setPinInfo(marker);
                    }}
            />
        )
    });
    // --- Map end ---

    // --- Helpers ---
    function setBtnsVisibility(createBtn, confirmBtn, cancelBtn) {
        setIsCreateMarkerVisible(createBtn);
        setIsCancelMarkerVisible(cancelBtn);
        setIsConfirmMarkerVisible(confirmBtn);
    }

    const generateNewMarker = () => {
        const mapCenter = map.current.getCenter();
        setTempMarker({longitude: mapCenter.lng, latitude: mapCenter.lat});
        setIsTempMarkerShow(true);
    }
    // ---- Helpers end ----

    function onCancelMarker() {
        setIsTempMarkerShow(false);
        setBtnsVisibility(true, false, false);
    }

    function onAddMarker() {
        setIsMarkerTypeModalOpen(true);
        setBtnsVisibility(false, true, true);
    }

    function onConfirmMarker() {
        setIsFillingModalOpen(true);
    }


    const onCreate = async (values) => {
        console.log(values);
        const newMarker = {id: Date.now(), longitude: tempMarker.longitude, latitude: tempMarker.latitude, type: markerType, geoValues: values};
        await createMarkerOnServer(newMarker);
        setIsTempMarkerShow(false);
        setIsFillingModalOpen(false);
        setBtnsVisibility(true, false, false);
    };

    const loadMarkersData = async () => {
        const result = await api.loadMarkersData();
        if (result) dispatch(addMarkers(result.data));
    };

    const createMarkerOnServer = async (marker) => {
        const result = await api.createMarkerOnServer(marker);
        if (result) dispatch(addOneMarker(marker));
    }

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
                        style={{height: "75vh", width: "100%"}}
                        mapStyle="mapbox://styles/mapbox/streets-v9"
                        mapboxAccessToken={APP_MAP_TOKEN}
                        attributionControl={true}
                    >
                        <NavigationControl />
                        {pins()}

                        { isTempMarkerShow && <CustomMarker longitude={tempMarker.longitude} latitude={tempMarker.latitude} color={detectMarkerColor(markerType)} />}

                        {pinInfo && (
                            <Popup
                                anchor="top"
                                longitude={Number(pinInfo.longitude)}
                                latitude={Number(pinInfo.latitude)}
                                onClose={() => setPinInfo(null)}
                            >
                                <PinContent data={pinInfo} />
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

            <MarkerTypePopup
                visible={isMarkerTypeModalOpen}
                setVisible={setIsMarkerTypeModalOpen}
                onCancel={onCancelMarker}
                onOk={generateNewMarker}
            />

            <FillingPopup
                visible={isFillingModalOpen}
                setVisible={setIsFillingModalOpen}
                onCreate={onCreate}
            />
        </>
    )
}

export default MapLayout;