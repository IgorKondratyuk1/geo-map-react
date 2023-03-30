import { createSlice, current } from "@reduxjs/toolkit";

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
        addMarkerIndicator(state, action) {
            const markerIndex = state.findIndex(marker => marker.id === action.payload.markerId);
            const marker = state[markerIndex];
            let newMarker = {...marker, indicators: [...marker.indicators, action.payload.indicator]}


            console.log("marker");
            console.log(current(state));
            console.log(action);
            console.log(current(marker));

            const newMarkers = [
                ...state.slice(0, markerIndex),
                newMarker,
                ...state.slice(markerIndex + 1)
            ];

            return newMarkers;
        }
    },
})

export const { addMarkers, addOneMarker, addMarkerIndicator } = markersSlice.actions;
export default markersSlice.reducer;