import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import prepareData from "./ChartDataPreparer";
import formatData from "./ChartDataFormatter";
import options from "./ChartOptions";
import { useSelector } from "react-redux";

const ChartComponent = () => {
  const [chartData, setChartData] = useState(null);
  const reduxFilteredData = useSelector((state) => state.csvData);

  useEffect(() => {
    const preparedData = prepareData(reduxFilteredData);
    const formattedData = formatData(preparedData);
    setChartData(formattedData);
  }, [reduxData]);

  if (!chartData) {
    return <div>Loading...</div>;
  }

  return <Line data={chartData} options={options} />;
};

export default ChartComponent;
