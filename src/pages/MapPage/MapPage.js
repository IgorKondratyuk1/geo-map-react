import {Button, Col, Row, Space} from "antd";
import React, {useEffect, useState} from "react";
import s from "./MapPage.module.css";
import Map, {Marker, NavigationControl, Popup} from "react-map-gl";
import CustomMarker from "../../components/CustomMap/CustomMarker/CustomMarker";
import MarkerTypePopup from "../../components/MarkerTypePopup/MarkerTypePopup";
import FillingPopup from "../../components/FillingPopup/FillingPopup";
import PinContent from "../../components/PinContent/PinContent";
import {addMarkerIndicator, addMarkers, addOneMarker} from "../../redux/slices/markersSlice";
import {useDispatch, useSelector, useStore} from "react-redux";
import {api} from "../../api/api";
import {detectMarkerColor} from "../../helpers/detectMarkerColor";
import {setCoordinates, setDefaultState, setType} from "../../redux/slices/indicatorsFormSlice";
import Filters from "../../components/MarkersFilter/Filters";
import {
    hideAddMarkerDataPopup,
    hideCreateMarkerDataPopup,
    hideMarkerTypePopup, showCreateMarkerDataPopup,
    showMarkerTypePopup
} from "../../redux/slices/popupsSlice";

const APP_MAP_TOKEN = process.env.REACT_APP_MAP_TOKEN;

export const MapPage = () => {
    const store = useStore();
    const dispatch = useDispatch();
    let [markers, setMarkers] = useState(useSelector((state) => state.markers));
    const markerType = useSelector((state) => state.tempMarker.markerType);
    const filters = useSelector((state) => state.filters);
    const filtersMarkerTypes = filters.markerTypes;
    const filtersProperties = filters.properties;

    const isCreateMarkerDataPopup = useSelector((state) => state.popups.createMarkerDataPopup);
    const isAddMarkerDataPopup = useSelector((state) => state.popups.addMarkerDataPopup);
    const isMarkerTypeModalOpen = useSelector((state) => state.popups.markerTypePopup);

    const [isCreateMarkerVisible, setIsCreateMarkerVisible] = React.useState(true);
    const [isConfirmMarkerVisible, setIsConfirmMarkerVisible] = React.useState(false);
    const [isCancelMarkerVisible, setIsCancelMarkerVisible] = React.useState(false);


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

    const isIncludeProperties = (marker) => {
        const indicatorsArr = marker.indicators;
        if (indicatorsArr && indicatorsArr.length > 0) {
            for (let i = 0; i < indicatorsArr.length; i++) {
                if (indicatorsArr[i]?.geoValues?.length > 0) {
                    const geoValues = indicatorsArr[i].geoValues.map(geoValue => geoValue.selectedItem)
                    for (let j = 0; j < geoValues.length; j++) {
                        if (filtersProperties.includes(geoValues[j])) {
                            return true;
                        }
                    }
                    return false;
                }
            }
        } else {
            return false;
        }
    }

    const pins = (markers) => {
        return markers.filter(item => (filtersMarkerTypes.includes(item.type) && isIncludeProperties(item))).map(marker => {
                const color = detectMarkerColor(marker.type);
                return (
                    <Marker key={marker.id}
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
            }
        )
    };
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
        dispatch(setDefaultState())
        setIsTempMarkerShow(false);
        setBtnsVisibility(true, false, false);
    }

    function onAddMarker() {
        dispatch(showMarkerTypePopup())
        setBtnsVisibility(false, true, true);
    }

    function onConfirmMarker() {
        dispatch(showCreateMarkerDataPopup())
    }

    const onCreateData = async (values) => {
        dispatch(setType(markerType));
        dispatch(setCoordinates({longitude: tempMarker.longitude, latitude: tempMarker.latitude}));
        await createMarkerOnServer(store.getState().indicatorsForm);
        await loadMarkersData();

        dispatch(setDefaultState()) // clearState

        // Default markers and buttons visibility
        setIsTempMarkerShow(false);
        dispatch(hideCreateMarkerDataPopup());
        setBtnsVisibility(true, false, false);
    };

    const onAddData = async (values) => {
        const filledForm = store.getState().indicatorsForm;
        await addMarkerDataOnServer(filledForm.makerId, filledForm.geoValues);
        dispatch(hideAddMarkerDataPopup());
    };

    const loadMarkersData = async () => {
        const result = await api.loadMarkersData();
        if (result) dispatch(addMarkers(result.data));
    };

    const createMarkerOnServer = async (marker) => {
        const result = await api.createMarkerOnServer(marker);
        if (result) dispatch(addOneMarker(marker));
    }

    const addMarkerDataOnServer = async (markerId, geoValues) => {
        const result = await api.addIndicatorOnServer(markerId, geoValues);
        if (result) {
            const markerId = result.data.markerId;
            const indicator = result.data;
            dispatch(addMarkerIndicator({markerId, indicator}));
            setPinInfo(null);
        }
    }


    return (
        <>
            <MarkerTypePopup
                visible={isMarkerTypeModalOpen}
                setVisible={() => {dispatch(hideMarkerTypePopup());}}
                onCancel={onCancelMarker}
                onOk={generateNewMarker}
            />
            <FillingPopup
                visible={isCreateMarkerDataPopup}
                setVisible={() => {dispatch(hideCreateMarkerDataPopup());}}
                onCreate={onCreateData}
            />
            <FillingPopup
                visible={isAddMarkerDataPopup}
                setVisible={() => {dispatch(hideAddMarkerDataPopup());}}
                onCreate={onAddData}
            />
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
                        <NavigationControl/>
                        <Filters />

                        {pins(markers)}

                        {isTempMarkerShow &&
                            <CustomMarker longitude={tempMarker.longitude} latitude={tempMarker.latitude}
                                          color={'white'}/>}

                        {pinInfo && (
                            <Popup
                                anchor="top"
                                longitude={Number(pinInfo.longitude)}
                                latitude={Number(pinInfo.latitude)}
                                onClose={() => setPinInfo(null)}
                                maxWidth='100%'
                            >
                                <PinContent data={pinInfo}/>
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
                            <Button onClick={onConfirmMarker} type="primary">Додати маркер</Button>
                        }
                        {isCreateMarkerVisible &&
                            <Button onClick={onAddMarker} type="primary">Створити маркер</Button>
                        }
                    </Space>
                </Col>
            </Row>
        </>
    )
}

export default MapPage;