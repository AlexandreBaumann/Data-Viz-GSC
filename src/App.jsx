import React, { useState } from "react";
import FilterForm from "./components/filterform";
import ChartComponent from "./components/chart/chart";

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

  return (
    <div className="App">
      <div id="filterDiv">
        <FilterForm />
      </div>
      <div id="chartDiv">
        <ChartComponent />
      </div>
    </div>
  );
}

export default App;
