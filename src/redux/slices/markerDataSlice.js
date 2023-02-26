import { createSlice } from "@reduxjs/toolkit";

let initState = {
    type: null
}

const markerDataSlice = createSlice({
    name: 'markerData',
    initialState: initState,
    reducers: {
        changeType(state, action) {
            return {...state, type: action.payload};
        }
    },
})

export const { changeType } = markerDataSlice.actions;
export default markerDataSlice.reducer;