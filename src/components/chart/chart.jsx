import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import prepareData from "./ChartDataPreparer";
import formatData from "./ChartDataFormatter";
import options from "./ChartOptions";
import { useSelector } from "react-redux";
import "chart.js/auto";

const ChartComponent = () => {
  const [chartData, setChartData] = useState(null);
  const filteredData = useSelector((state) => state.filteredData);

  useEffect(() => {
    const preparedData = prepareData(filteredData.data);
    const formattedData = formatData(preparedData);
    setChartData(formattedData);
  }, [filteredData]);

  if (!chartData) {
    return <div>Loading...</div>;
  }

  return <Line data={chartData} options={options} />;
};

export default ChartComponent;
