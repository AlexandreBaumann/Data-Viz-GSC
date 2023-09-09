import { createSlice } from "@reduxjs/toolkit";

const selectAllData = (state) => state.csvData;

const initialState = {
  data: selectAllData,
};

const filteredDataSlice = createSlice({
  name: "filteredData",
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
    applyFilters: (state) => {
      // Extract filters from state
      const {
        pageFilter,
        queryFilter,
        categoryFilter,
        typeFilter,
        minQueryImpressions,
        minPageImpressions,
      } = state.filter;

      // Apply the filters to the data
      let filteredData = selectAllData(state);

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

export const { setData, applyFilters } = filteredDataSlice.actions;
export default filteredDataSlice.reducer;
