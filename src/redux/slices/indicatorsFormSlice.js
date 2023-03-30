import { createSlice } from "@reduxjs/toolkit";

const initState = {
    type: null,
    longitude: null,
    latitude: null,
    geoValues: [],
    makerId: null
}

const indicatorsFormSlice = createSlice({
    name: 'indicatorsForm',
    initialState: initState,
    reducers: {
        setDefaultState(state) {
            return {...initState};
        },
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
        setUpdatingMarkerId(state, action) {
            return {...state, makerId: action.payload};
        }
    },
})

export const { addGeoValue, setType, setCoordinates, changeGeoValueSelect, changeGeoValueInput, setDefaultState, setUpdatingMarkerId } = indicatorsFormSlice.actions;
export default indicatorsFormSlice.reducer;