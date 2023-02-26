import { configureStore } from '@reduxjs/toolkit';
import markersSlice from "./slices/markersSlice";
import tempMarkerSlice from "./slices/tempMarkerSlice";

export const store = configureStore({
    reducer: {
        markers: markersSlice,
        tempMarker: tempMarkerSlice,
    }
});