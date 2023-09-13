// store.js

import { configureStore } from "@reduxjs/toolkit";
import csvDataReducer from "./csvDataSlice";
import filterReducer from "./filterSlice";
import filteredDataReducer from "./filteredDataSlice";
import consolidatedDataReducer from "./consolidatedDataSlice";

const store = configureStore({
  reducer: {
    csvData: csvDataReducer,
    filter: filterReducer,
    filteredData: filteredDataReducer,
    consolidatedData: consolidatedDataReducer,
  },
});

export default store;
