// store.js

import { configureStore } from "@reduxjs/toolkit";
import csvDataReducer from "./csvDataSlice";
import filterReducer from "./filterSlice";
import filteredDataReducer from "./filteredDataSlice";
const store = configureStore({
  reducer: {
    csvData: csvDataReducer,
    filter: filterReducer,
    filteredData: filteredDataReducer,
  },
});

export default store;
