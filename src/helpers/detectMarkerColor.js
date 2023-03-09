export const detectMarkerColor = (param) => {
    switch (param) {
        case "water":
            return "blue";
        case "company":
            return "purple";
        case "soil":
            return "brown";
        case "radiation":
            return "yellow";
        case "air":
            return "lightblue";
        case "waste":
            return "green";
        case "energy":
            return "orange";
        default:
            return "red";
    }
}