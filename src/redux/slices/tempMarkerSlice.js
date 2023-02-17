import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    markerType: null,
    markerData: null
};

const tempMarkerSlice = createSlice({
    name: 'tempMarker',
    initialState: initialState,
    reducers: {
        changeMarkerType(state, action) {
            return {...state, markerType: action.payload};
        },
        changeMarkerData(state, action) {
            return {...state, markerData: action.payload};
        }
    },
})

export const { changeMarkerType, changeMarkerData } = tempMarkerSlice.actions;
export default tempMarkerSlice.reducer;