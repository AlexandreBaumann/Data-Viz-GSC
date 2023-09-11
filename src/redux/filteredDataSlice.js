import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  data: [], // Assurez-vous que data est initialisé comme un tableau vide
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
      state.data = action.payload; // Ici, nous mettons à jour state.data
    },
    setFilters: (state, action) => {
      const {
        pageFilter,
        queryFilter,
        categoryFilter,
        typeFilter,
        minQueryImpressions,
        minPageImpressions,
        startWeek,
        endWeek,
      } = action.payload.filter;

      let filteredData = state.data;

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
      if (startWeek && endWeek) {
        filteredData = filteredData.filter(
          (row) =>
            parseInt(row.Week) >= startWeek && parseInt(row.Week) <= endWeek
        );
      }

      state.data = filteredData;
    },
  },
});

export const { setData, setFilters } = filteredDataSlice.actions;
export default filteredDataSlice.reducer;
