import {airParams, radiationParams, soilParams, waterParams} from "../dictionariesData";

export const getMarkerLabelName = (type, value) => {
    let dictionaryArray = [];
    console.log([type, value]);
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
        default:
            dictionaryArray = [];
            break
    }

    const dictionaryElem = dictionaryArray.find(d => d.value === value)
    return dictionaryElem?.label || value;
}