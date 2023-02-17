import axios from "axios";

const baseUrl = process.env.REACT_APP_BASE_URL;

export const api = {
    loadMarkersData: async () => {
        const result = await axios.get(`${baseUrl}/markers`);
        if (result.status >= 200 && result.status < 300) {
            return result;
        } else {
            console.log(result.status + " " + result.statusText);
            return null;
        }
    },
    createMarkerOnServer: async (marker) => {
        const result = await axios.post(`${baseUrl}/markers`, marker, {headers: {'Content-Type': 'application/json'}});
        if (result.status >= 200 && result.status < 300) {
            return result
        } else {
            console.log(result.status + " " + result.statusText);
        }
    }
}