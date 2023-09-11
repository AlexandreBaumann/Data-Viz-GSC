import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import fetchCsvData from "./CsvDataFetcher";

export const fetchCsv = createAsyncThunk("csvData/fetchCsv", async () => {
  const csvData = await fetchCsvData();
  return csvData;
});

const csvDataSlice = createSlice({
  name: "csvData",
  initialState: [],
  reducers: {
    setCsvData: (state, action) => {
      return action.payload;
    },
  },
  extraReducers: {
    [fetchCsv.fulfilled]: (state, action) => {
      return [...action.payload];
    },
  },
});
export const { setCsvData } = csvDataSlice.actions;
export default csvDataSlice.reducer;
