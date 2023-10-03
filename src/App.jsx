import FilterForm from "./components/filterform";
import ChartComponent from "./components/chart/chart";

import "./App.css";

function App() {
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
