import {
    airParams,
    economicParams, energyParams,
    healthParams,
    radiationParams,
    soilParams,
    wasteParams,
    waterParams
} from "../dictionariesData";

export const getMarkerLabelName = (type, value) => {
    let dictionaryArray = [];

    switch (type) {
        case 'air':
            dictionaryArray = airParams;
            break;
        case 'water':
            dictionaryArray = waterParams;
            break;
        case 'soil':
            dictionaryArray = soilParams;
            break;
        case 'radiation':
            dictionaryArray = radiationParams;
            break;
        case 'waste':
            dictionaryArray = wasteParams;
            break;
        case 'economic':
            dictionaryArray = economicParams;
            break;
        case 'health':
            dictionaryArray = healthParams;
            break;
        case 'energy':
            dictionaryArray = energyParams;
            break;
        default:
            dictionaryArray = [];
            break
    }

    const dictionaryElem = dictionaryArray.find(d => d.value === value)
    return dictionaryElem?.label || value;
}