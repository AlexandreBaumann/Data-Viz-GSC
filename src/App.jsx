import React, { useState, useEffect } from "react";
import prepareData from "./ChartDataPreparer";
import formatData from "./ChartDataFormatter";
import options from "./ChartOptions";
import filterData from "./filterData";
import FilterForm from "./filterform";
import getFilterOptions from "./getFilterOptions";
import { useDispatch, useSelector } from "react-redux";
import {
  setPageFilter,
  setQueryFilter,
  setCategoryFilter,
  setTypeFilter,
  setMinQueryImpressions,
  setMinPageImpressions,
} from "./redux/filterSlice";
import {
  selectQueriesForPage,
  selectPagesForQuery,
} from "./redux/filterSelector";

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
  const [startWeek, setStartWeek] = useState(1);
  const [endWeek, setEndWeek] = useState(52);
  const [filterOptions, setFilterOptions] = useState({
    queryOptions: [],
    pageOptions: [],
    categories: {},
    types: {},
  });

  ///////////////
  const dispatch = useDispatch();
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
  const availableQueries = useSelector(selectQueriesForPage);
  const availablePages = useSelector(selectPagesForQuery);

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
        availablePages={availablePages}
        availableQueries={availableQueries}
        queryFilter={queryFilter}
        pageFilter={pageFilter}
        setQueryFilter={(value) => dispatch(setQueryFilter(value))}
        setPageFilter={(value) => dispatch(setPageFilter(value))}
        minQueryImpressions={minQueryImpressions}
        setMinQueryImpressions={(value) =>
          dispatch(setMinQueryImpressions(value))
        }
        minPageImpressions={minPageImpressions}
        setMinPageImpressions={(value) =>
          dispatch(setMinPageImpressions(value))
        }
        categoryFilter={categoryFilter}
        setCategoryFilter={(value) => dispatch(setCategoryFilter(value))}
        typeFilter={typeFilter}
        setTypeFilter={(value) => dispatch(setTypeFilter(value))}
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
