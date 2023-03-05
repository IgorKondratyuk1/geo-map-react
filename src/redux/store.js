import { configureStore } from '@reduxjs/toolkit';
import markersSlice from "./slices/markersSlice";
import tempMarkerSlice from "./slices/tempMarkerSlice";
import indicatorsFormSlice from "./slices/indicatorsFormSlice";

export const store = configureStore({
    reducer: {
        markers: markersSlice,
        tempMarker: tempMarkerSlice,
        indicatorsForm: indicatorsFormSlice
    }
});