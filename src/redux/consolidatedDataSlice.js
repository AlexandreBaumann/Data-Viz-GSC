import { createSlice } from "@reduxjs/toolkit";

const consolidatedDataSlice = createSlice({
  name: "consolidatedData",
  initialState: {
    byQuery: null,
    byPage: null,
  },
  reducers: {
    setConsolidatedDataByQuery: (state, action) => {
      state.byQuery = action.payload;
    },
    setConsolidatedDataByPage: (state, action) => {
      state.byPage = action.payload;
    },
  },
});
export const { setConsolidatedDataByQuery, setConsolidatedDataByPage } =
  consolidatedDataSlice.actions;
export default consolidatedDataSlice.reducer;
