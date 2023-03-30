import {useLoaderData} from "react-router-dom";
import { Typography } from 'antd';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import {generalParams, markersType} from "../../dictionariesData";
import {geChartLabels, getMarkerName, getParamName} from "../../helpers/charts";
import InfoChart from "../../components/InfoChart/InfoChart";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const getChartData = (indicators) => {
    let result = {};

    indicators.forEach(indicator => {
        indicator.geoValues.forEach(geoData => {
            if (result[geoData.selectedItem]) {
                result[geoData.selectedItem].push({name: indicator.createdAt,  pv: Number(geoData.value)})
            } else {
                result[geoData.selectedItem] = [{name: indicator.createdAt,  pv: Number(geoData.value)}];
            }
        });
    });

    return result;
}

const getFormattedDatasets = (dataObj) => {
    let result = [];
    console.log(dataObj);
    for (let key in dataObj) {
            result.push({
                label: key,
                data: dataObj[key].map((item) => Number(item.pv)),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            })
    }
    return result;
}

export const MarkerInfoPage = () => {
    const apiData = useLoaderData();
    const indicators = apiData.data.indicators;
    const chartData = getChartData(indicators);
    const dataSets = getFormattedDatasets(chartData);
    const markerType = getMarkerName(apiData.data.type);

    return (
        <div>
            <Typography.Title style={{textAlign: 'center'}}>{markerType ? markerType.label : ""}</Typography.Title>
            <Typography.Text style={{display: 'block' ,textAlign: 'center'}} type="secondary">ID об'єкта: {apiData.data.id}</Typography.Text>
            <div>
                {dataSets.map((dataSet, index) => <InfoChart key={index} chartData={chartData} dataSet={dataSet} />)}
            </div>
        </div>
    )
}