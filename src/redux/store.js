import { configureStore } from "@reduxjs/toolkit";
import csvDataReducer from "./csvDataSlice"; // Assurez-vous que le chemin d'importation est correct

const store = configureStore({
  reducer: {
    csvData: csvDataReducer,
  },
});

export default store;
