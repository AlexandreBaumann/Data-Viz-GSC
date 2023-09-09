// store.js

import { configureStore } from "@reduxjs/toolkit";
import csvDataReducer from "./csvDataSlice";
import filterReducer from "./filterSlice";
import filteredDataReducer from "./filteredDataSlice"; // Ajoutez cette ligne

const store = configureStore({
  reducer: {
    csvData: csvDataReducer,
    filter: filterReducer,
    filteredData: filteredDataReducer, // Ajoutez cette ligne
  },
});

export default store;
