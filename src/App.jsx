import React, { useState, useEffect } from "react";
import fetchCsvData from "./CsvDataFetcher";
import prepareData from "./ChartDataPreparer";
import formatData from "./ChartDataFormatter";
import options from "./ChartOptions";
import filterData from "./filterData";
import FilterForm from "./filterform";
import getFilterOptions from "./getFilterOptions";

// Il faudrait faire que les requêtes disponibles collent à la page sélectionnée
// Nickel.
// Maintenant, serait-il possible de faire qu'à côté du canva soient affichées les données des requêtes sélectionnées dans un tableau ?

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
  const [chartData, setChartData] = React.useState(null);
  const [pageFilter, setPageFilter] = React.useState("");
  const [queryFilter, setQueryFilter] = React.useState("");
  const [minQueryImpressions, setMinQueryImpressions] = useState(0);
  const [minPageImpressions, setMinPageImpressions] = useState(0);
  const [categoryFilter, setCategoryFilter] = React.useState("");
  const [typeFilter, setTypeFilter] = React.useState("");
  const [filterOptions, setFilterOptions] = React.useState({
    queryOptions: [],
    pageOptions: [],
    categories: {},
    types: {},
  });
  React.useEffect(() => {
    fetchCsvData().then((csvData) => {
      const filteredData = filterData(
        csvData,
        queryFilter,
        pageFilter,
        categoryFilter,
        typeFilter
      );
      const preparedData = prepareData(filteredData);
      const formattedData = formatData(preparedData);
      setChartData(formattedData);
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
