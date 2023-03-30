import React from 'react';
import {Line} from "react-chartjs-2";
import {geChartLabels, getParamName} from "../../helpers/charts";

const InfoChart = ({dataSet, chartData}) => {
    const paramName = getParamName(dataSet.label);
    const labels = geChartLabels(dataSet.label, chartData);
    const options = {
        responsive: true,
        plugins: {
            legend: {position: 'top'},
            title: {
                display: true,
                text: paramName ? paramName.label : '',
            },
        },
    };
    const data = {labels, datasets: [dataSet]};

    return <Line style={{marginTop: '20px'}} options={options} data={data} />
}

export default InfoChart;