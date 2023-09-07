import React, { useState, useEffect } from "react";
import fetchCsvData from "./CsvDataFetcher";
import prepareData from "./ChartDataPreparer";
import formatData from "./ChartDataFormatter";
import options from "./ChartOptions";
import filterData from "./filterData";
import FilterForm from "./filterform";
import getFilterOptions from "./getFilterOptions";
import "./App.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function App() {
  const [chartData, setChartData] = useState(null);
  const [pageFilter, setPageFilter] = useState("");
  const [queryFilter, setQueryFilter] = useState("");
  const [minQueryImpressions, setMinQueryImpressions] = useState(0);
  const [minPageImpressions, setMinPageImpressions] = useState(0);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [startWeek, setStartWeek] = useState(1);
  const [endWeek, setEndWeek] = useState(52);
  const [filterOptions, setFilterOptions] = useState({
    queryOptions: [],
    pageOptions: [],
    categories: {},
    types: {},
  });

  useEffect(() => {
    fetchCsvData().then((csvData) => {
      const filteredData = filterData(
        csvData,
        queryFilter,
        pageFilter,
        categoryFilter,
        typeFilter
      );
      const preparedData = prepareData(filteredData);
      let formattedData = formatData(preparedData);

      // Slice the data based on the week range
      const displayedWeeks = formattedData.labels.slice(startWeek - 1, endWeek);
      const displayedDatasets = formattedData.datasets.map((dataset) => ({
        ...dataset,
        data: dataset.data.slice(startWeek - 1, endWeek),
      }));

      // Update the chart data with the sliced data
      setChartData({
        labels: displayedWeeks,
        datasets: displayedDatasets,
      });

      setFilterOptions(
        getFilterOptions(csvData, minQueryImpressions, minPageImpressions)
      );
    });
  }, [
    queryFilter,
    pageFilter,
    categoryFilter,
    typeFilter,
    minQueryImpressions,
    minPageImpressions,
    startWeek,
    endWeek,
  ]);

  if (!chartData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <FilterForm
        queryFilter={queryFilter}
        pageFilter={pageFilter}
        setQueryFilter={setQueryFilter}
        setPageFilter={setPageFilter}
        minQueryImpressions={minQueryImpressions}
        setMinQueryImpressions={setMinQueryImpressions}
        minPageImpressions={minPageImpressions}
        setMinPageImpressions={setMinPageImpressions}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        typeFilter={typeFilter}
        setTypeFilter={setTypeFilter}
        filterOptions={filterOptions}
        startWeek={startWeek}
        endWeek={endWeek}
        setStartWeek={setStartWeek}
        setEndWeek={setEndWeek}
      />
      <div id="chartDiv">
        {chartData ? (
          <Line data={chartData} options={options} />
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
}

export default App;
