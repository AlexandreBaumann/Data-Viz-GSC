import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  pageFilter: "",
  queryFilter: "",
  categoryFilter: "",
  typeFilter: "",
  minQueryImpressions: 0,
  minPageImpressions: 0,
  startWeek: 1,
  endWeek: 52,
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setPageFilter: (state, action) => {
      state.pageFilter = action.payload;
    },
    setQueryFilter: (state, action) => {
      state.queryFilter = action.payload;
    },
    setCategoryFilter: (state, action) => {
      state.categoryFilter = action.payload;
    },
    setTypeFilter: (state, action) => {
      state.typeFilter = action.payload;
    },
    setMinQueryImpressions: (state, action) => {
      state.minQueryImpressions = action.payload;
    },
    setMinPageImpressions: (state, action) => {
      state.minPageImpressions = action.payload;
    },
    setStartWeek: (state, action) => {
      state.startWeek = action.payload;
    },
    setEndWeek: (state, action) => {
      state.endWeek = action.payload;
    },
  },
});

export const {
  setPageFilter,
  setQueryFilter,
  setCategoryFilter,
  setTypeFilter,
  setMinQueryImpressions,
  setMinPageImpressions,
  setStartWeek,
  setEndWeek,
} = filterSlice.actions;

export default filterSlice.reducer;
