import { createSlice } from "@reduxjs/toolkit";

const initState = {
    type: null,
    longitude: null,
    latitude: null,
    geoValues: [{id: "1", "type": "water", "selectedItem": "mn", "value": "2"}, {id: "2", "type": "water", "selectedItem": "cu", "value": "4"}]
}

const indicatorsFormSlice = createSlice({
    name: 'indicatorsForm',
    initialState: initState,
    reducers: {
        setType(state, action) {
            return {...state, type: action.payload};
        },
        setCoordinates(state, action) {
            return {...state, longitude: action.payload.longitude, latitude: action.payload.latitude };
        },
        addGeoValue(state, action) {
            return {...state, geoValues: [...state.geoValues, action.payload]};
        },
        changeGeoValueSelect(state, action) {
            const index = state.geoValues.findIndex(geoValue => geoValue.id === action.payload.id);
            const geoValue = state.geoValues[index];

            const newGeoValues = [
                ...state.geoValues.slice(0, index),
                { ...geoValue,  selectedItem: action.payload.selectedItem},
                ...state.geoValues.slice(index + 1)
            ];

            return {...state, geoValues: newGeoValues};
        },
        changeGeoValueInput(state, action) {
            const index = state.geoValues.findIndex(geoValue => geoValue.id === action.payload.id);
            const geoValue = state.geoValues[index];

            const newGeoValues = [
                ...state.geoValues.slice(0, index),
                { ...geoValue,  value: action.payload.value},
                ...state.geoValues.slice(index + 1)
            ];

            return {...state, geoValues: newGeoValues};
        },
    },
})

export const { addGeoValue, setType, setCoordinates, changeGeoValueSelect, changeGeoValueInput } = indicatorsFormSlice.actions;
export default indicatorsFormSlice.reducer;