import {generalParams, markersType} from "../dictionariesData";

export const geChartLabels = (key, chartData) => chartData[key].map(indicator => indicator.name);
export const getParamName = (paramValue) => generalParams.find(p => p.value === paramValue);
export const getMarkerName = (markerValue) => markersType.find(m => m.value === markerValue);