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
        deleteOneMarker(state, action) {},
    },
})

export const { addMarkers, addOneMarker, deleteOneMarker } = markersSlice.actions;
export default markersSlice.reducer;