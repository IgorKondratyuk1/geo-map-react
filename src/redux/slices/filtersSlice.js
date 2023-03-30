import { createSlice } from "@reduxjs/toolkit";
import {
    airParams,
    economicParams, energyParams, generalParams,
    healthParams,
    markersType,
    radiationParams,
    soilParams,
    waterParams
} from "../../dictionariesData";

// TODO delete
const initialState = {
    markerTypes: [...markersType.map(t => t.value)],
    properties: [ ...generalParams.map(t => t.value)
        // ...airParams.map(t => t.value),
        // ...radiationParams.map(t => t.value),
        // ...soilParams.map(t => t.value),
        // ...waterParams.map(t => t.value),
        // ...economicParams.map(t => t.value),
        // ...healthParams.map(t => t.value),
        // ...energyParams.map(t => t.value),
    ]
}

const filtersSlice = createSlice({
    name: 'filters',
    initialState: initialState,
    reducers: {
        addFilterMarkerType(state, action) {
            return {...state, markerTypes: Array.from(new Set([...state.markerTypes, ...action.payload]))};
        },
        removeFilterMarkerType(state, action) {
            return {...state, markerTypes: state.markerTypes.filter(item => item !== action.payload) };
        },
        toggleFilterMarkerType(state, action) {
            if (state.markerTypes.includes(action.payload)) {
                return {...state, markerTypes: state.markerTypes.filter(item => item !== action.payload) };
            } else {
                return {...state, markerTypes: Array.from(new Set([...state.markerTypes, action.payload]))};
            }
        },
        toggleFilterProperties(state, action) {
            if (state.properties.includes(action.payload)) {
                return {...state, properties: state.properties.filter(item => item !== action.payload) };
            } else {
                return {...state, properties: Array.from(new Set([...state.properties, action.payload]))};
            }
        },
    },
})

export const { addFilterMarkerType, removeFilterMarkerType, toggleFilterMarkerType, toggleFilterProperties } = filtersSlice.actions;
export default filtersSlice.reducer;