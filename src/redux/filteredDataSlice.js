import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const selectAllData = (state) => state.csvData;

const initialState = {
  data: [selectAllData],
};

// Thunk pour applyFilters
export const applyFilters = createAsyncThunk(
  "filteredData/applyFilters",
  async (_, { dispatch, getState }) => {
    const globalState = getState();
    dispatch(setFilters(globalState));
  }
);

const filteredDataSlice = createSlice({
  name: "filteredData",
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
    setFilters: (state, action) => {
      const {
        pageFilter,
        queryFilter,
        categoryFilter,
        typeFilter,
        minQueryImpressions,
        minPageImpressions,
      } = action.payload.filter;

      let filteredData = selectAllData(action.payload);

      if (queryFilter) {
        filteredData = filteredData.filter((row) => row.Query === queryFilter);
      }
      if (pageFilter) {
        filteredData = filteredData.filter((row) => row.Page === pageFilter);
      }
      if (typeFilter) {
        filteredData = filteredData.filter((row) => row.Type === typeFilter);
      }
      if (categoryFilter) {
        filteredData = filteredData.filter(
          (row) => row.Cat1 === categoryFilter
        );
      }
      filteredData = filteredData.filter(
        (row) => row.Impressions >= minQueryImpressions
      );
      filteredData = filteredData.filter(
        (row) => row.Impressions >= minPageImpressions
      );

      state.data = filteredData;
    },
  },
});

export const { setData, setFilters } = filteredDataSlice.actions;
export default filteredDataSlice.reducer;
