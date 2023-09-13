import React, { useState, useEffect } from "react";
import style from "./chart.module.scss";

import { Line } from "react-chartjs-2";
import prepareData from "./ChartDataPreparer";
import formatData from "./ChartDataFormatter";
import options from "./ChartOptions";
import { useSelector } from "react-redux";
import "chart.js/auto";
import {
  consolidateDataByPage,
  consolidateDataByQuery,
} from "./consolidationLogic"; // Nouveau

const ChartComponent = () => {
  const [chartData, setChartData] = useState(null);
  const [tableDataPages, setTableDataPages] = useState(null);
  const [tableDataQuery, setTableDataQuery] = useState(null);
  const [tableDataType, setTableDataType] = useState("Page");
  const dataToDisplay =
    tableDataType === "Page" ? tableDataPages : tableDataQuery;

  const toggleDisplayType = () => {
    setTableDataType(tableDataType === "Page" ? "Query" : "Page");
  };
  const filteredData = useSelector((state) => state.filteredData);
  const startWeek = useSelector((state) => state.filter.startWeek);
  const endWeek = useSelector((state) => state.filter.endWeek);

  useEffect(() => {
    const preparedData = prepareData(filteredData.data, startWeek, endWeek);
    const formattedData = formatData(preparedData);
    setChartData(formattedData);

    console.log(filteredData.data);

    const tableDataPages = consolidateDataByPage(filteredData.data);
    const tableDataQuery = consolidateDataByQuery(filteredData.data);

    setTableDataPages(tableDataPages);
    setTableDataQuery(tableDataQuery);
  }, [filteredData, startWeek, endWeek]);

  if (!chartData) {
    return <div>Loading...</div>;
  }

  return (
    <div className={style.dataviz}>
      <section className={style.chart}>
        <Line data={chartData} options={options} />
      </section>
      <section className={style.table}>
        <button onClick={toggleDisplayType}>Toggle Table Data</button>
        <table>
          <thead>
            <tr>
              <th>Page</th>
              <th>Query</th>
              <th>Clicks</th>
              <th>Impressions</th>
              <th>Position</th>
            </tr>
          </thead>
          <tbody>
            {dataToDisplay &&
              dataToDisplay.map((row, index) => (
                <tr key={index}>
                  <td>{row.Page}</td>
                  <td>{row.Query}</td>
                  <td>{row.Clicks}</td>
                  <td>{row.Impressions}</td>
                  <td>{row.AveragePosition}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default ChartComponent;
