import { createSlice } from "@reduxjs/toolkit";

const markersSlice = createSlice({
    name: 'markers',
    initialState: [],
    reducers: {
        addMarkers(state, action) {
            return [...action.payload];
        },
        addOneMarker(state, action) {
            return [...state, action.payload];
        },
    },
})

export const { addMarkers, addOneMarker } = markersSlice.actions;
export default markersSlice.reducer;