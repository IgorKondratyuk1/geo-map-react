export const detectMarkerColor = (param) => {
    switch (param) {
        case "water_mark":
            return "blue";
        case "company":
            return "orange";
        case "soil":
            return "brown";
        case "radiation":
            return "yellow"
        default:
            return "red";
    }
}