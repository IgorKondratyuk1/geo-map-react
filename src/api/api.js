import axios from "axios";
import {addMarkers, addOneMarker} from "../redux/slices/markersSlice";

export const api = {
    loadMarkersData: async () => {
        const result = await axios.get('https://62f55046ac59075124cfa259.mockapi.io/markers');
        if (result.status >= 200 && result.status < 300) {
            return result;
        } else {
            console.log(result.status + " " + result.statusText);
            return null;
        }
    },
    createMarkerOnServer: async (marker) => {
        const result = await axios.post('https://62f55046ac59075124cfa259.mockapi.io/markers', marker, {headers: {'Content-Type': 'application/json'}});
        if (result.status >= 200 && result.status < 300) {
            return result
        } else {
            console.log(result.status + " " + result.statusText);
        }
    }
}