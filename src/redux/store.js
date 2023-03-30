import { configureStore } from '@reduxjs/toolkit';
import markersSlice from "./slices/markersSlice";
import tempMarkerSlice from "./slices/tempMarkerSlice";
import indicatorsFormSlice from "./slices/indicatorsFormSlice";
import filtersSlice from "./slices/filtersSlice";
import popupsSlice from "./slices/popupsSlice";

export const store = configureStore({
    reducer: {
        markers: markersSlice,
        tempMarker: tempMarkerSlice,
        indicatorsForm: indicatorsFormSlice,
        filters: filtersSlice,
        popups: popupsSlice,
    }
});