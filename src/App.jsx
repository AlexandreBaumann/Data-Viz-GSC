import React, { useState, useEffect } from "react";
import prepareData from "./ChartDataPreparer";
import formatData from "./ChartDataFormatter";
import options from "./ChartOptions";
import filterData from "./filterData";
import FilterForm from "./filterform";
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
  const [filterOptions, setFilterOptions] = useState({
    queryOptions: [],
    pageOptions: [],
    categories: {},
    types: {},
  });

  ///////////////
  const reduxData = useSelector((state) => state.csvData);
  const filters = useSelector((state) => state.filter) || {};
  const categoryFilter = useSelector((state) => state.filter.categoryFilter);
  const typeFilter = useSelector((state) => state.filter.typeFilter);
  const minQueryImpressions = useSelector(
    (state) => state.filter.minQueryImpressions
  );
  const minPageImpressions = useSelector(
    (state) => state.filter.minPageImpressions
  );

  const pageFilter = filters.pageFilter;
  const queryFilter = filters.queryFilter;
  ///////////////
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
      <FilterForm filterOptions={filterOptions} />
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
