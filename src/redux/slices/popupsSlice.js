import { createSlice } from "@reduxjs/toolkit";

const initState = {
    createMarkerDataPopup: false,
    addMarkerDataPopup: false,
    markerTypePopup: false
}

const popupsSlice = createSlice({
    name: 'popups',
    initialState: initState,
    reducers: {
        showCreateMarkerDataPopup(state) {
            return {...state, createMarkerDataPopup: true}
        },
        hideCreateMarkerDataPopup(state) {
            return {...state, createMarkerDataPopup: false}
        },
        showAddMarkerDataPopup(state) {
            return {...state, addMarkerDataPopup: true}
        },
        hideAddMarkerDataPopup(state) {
            return {...state, addMarkerDataPopup: false}
        },
        showMarkerTypePopup(state) {
            return {...state, markerTypePopup: true}
        },
        hideMarkerTypePopup(state) {
            return {...state, markerTypePopup: false}
        },
    },
})

export const { showCreateMarkerDataPopup, hideCreateMarkerDataPopup, showAddMarkerDataPopup, hideAddMarkerDataPopup, showMarkerTypePopup, hideMarkerTypePopup } = popupsSlice.actions;
export default popupsSlice.reducer;