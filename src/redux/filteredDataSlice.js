import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  data: [], // This will hold the filtered data
};

const filteredDataSlice = createSlice({
  name: "filteredData",
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
    applyFilters: (state, action) => {
      // Logic to filter the data based on the applied filters
      // For now, I'm adding a placeholder. The actual logic will depend on the filter criteria and data structure
      state.data = state.data.filter((item) => {
        // Filtering logic goes here
        return true; // Placeholder
      });
    },
  },
});

export const { setData, applyFilters } = filteredDataSlice.actions;
export default filteredDataSlice.reducer;
