// store.js

import { configureStore } from "@reduxjs/toolkit";
import csvDataReducer from "./csvDataSlice";
import filterReducer from "./filterSlice";

const store = configureStore({
  reducer: {
    csvData: csvDataReducer,
    filter: filterReducer,
  },
});

export default store;
