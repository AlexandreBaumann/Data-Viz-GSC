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

///////////////////////////////////COMPOSANT////////////////////////////
const ChartComponent = () => {
  ////////////STATE - INIT ///////////

  const [chartData, setChartData] = useState(null);

  const [tableDataPages, setTableDataPages] = useState(null);
  const [tableDataQuery, setTableDataQuery] = useState(null);
  const [tableDataType, setTableDataType] = useState("Page");

  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });
  const [sortedData, setSortedData] = useState([]);

  ////////////////

  const dataToDisplay =
    tableDataType === "Page" ? tableDataPages : tableDataQuery;

  const toggleDisplayType = () => {
    setTableDataType(tableDataType === "Page" ? "Query" : "Page");
  };
  const filteredData = useSelector((state) => state.filteredData);
  const startWeek = useSelector((state) => state.filter.startWeek);
  const endWeek = useSelector((state) => state.filter.endWeek);

  const onSort = (columnName) => {
    let direction = "asc";
    if (sortConfig.key === columnName && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key: columnName, direction });
  };

  ////////////////////////////USEEFFECTS////////////////////////////
  ////////////////////////////USEEFFECTS////////////////////////////
  ////////////////////////////USEEFFECTS////////////////////////////

  useEffect(() => {
    const preparedData = prepareData(filteredData.data, startWeek, endWeek);
    const formattedData = formatData(preparedData);
    setChartData(formattedData);

    // console.log(filteredData.data);

    const tableDataPages = consolidateDataByPage(filteredData.data);
    const tableDataQuery = consolidateDataByQuery(filteredData.data);

    setTableDataPages(tableDataPages);
    setTableDataQuery(tableDataQuery);
  }, [filteredData, startWeek, endWeek]);

  useEffect(() => {
    if (dataToDisplay && sortConfig.key) {
      const sortableItems = [...dataToDisplay];
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
      setSortedData(sortableItems);
    } else {
      setSortedData(dataToDisplay);
    }
  }, [sortConfig, dataToDisplay]);

  ////////////////////////////RENDU////////////////////////////

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
              {tableDataType === "Page" && <th>Page</th>}
              {tableDataType === "Query" && <th>Query</th>}
              <th onClick={() => onSort("Clicks")} className={style.sortButton}>
                Clicks
              </th>
              <th
                onClick={() => onSort("Impressions")}
                className={style.sortButton}
              >
                Impressions
              </th>
              <th>Position</th>
            </tr>
          </thead>
          <tbody>
            {sortedData &&
              sortedData.map((row, index) => (
                <tr key={index}>
                  {tableDataType === "Page" && (
                    <td className={style.key}>{row.Page}</td>
                  )}
                  {tableDataType === "Query" && (
                    <td className={style.key}>{row.Query}</td>
                  )}
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
