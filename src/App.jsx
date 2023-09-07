import React, { useState, useEffect } from "react";
import prepareData from "./ChartDataPreparer";
import formatData from "./ChartDataFormatter";
import options from "./ChartOptions";
import filterData from "./filterData";
import FilterForm from "./filterform";
import getFilterOptions from "./getFilterOptions";
import { useSelector } from "react-redux";

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
  const reduxData = useSelector((state) => state.csvData);

  useEffect(() => {
    const filteredData = filterData(
      reduxData,
      queryFilter,
      pageFilter,
      categoryFilter,
      typeFilter
    );
    const preparedData = prepareData(filteredData);
    const formattedData = formatData(preparedData);
    setChartData(formattedData);
    setFilterOptions(
      getFilterOptions(reduxData, minQueryImpressions, minPageImpressions)
    );
  }, [
    reduxData,
    queryFilter,
    pageFilter,
    categoryFilter,
    typeFilter,
    minQueryImpressions,
    minPageImpressions,
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
