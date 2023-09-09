// filterSelector.js
import { createSelector } from "@reduxjs/toolkit";

// Sélecteur pour obtenir toutes les données
const selectAllData = (state) => state.csvData;

// Sélecteur pour obtenir le filtre de page actuel

const selectPageFilter = (state) => state.filter.pageFilter;
const selectQueryFilter = (state) => state.filter.queryFilter;
const selectMinQueryImpressions = (state) => state.filter.minQueryImpressions;
const selectMinPageImpressions = (state) => state.filter.minPageImpressions;
const selectCategoryFilter = (state) => state.filter.categoryFilter;

// Sélecteur pour obtenir les requêtes basées sur le filtre de page
export const queriesOptions = createSelector(
  [selectAllData, selectPageFilter, selectMinQueryImpressions],
  (data, pageFilter, minImpressions) => {
    if (!pageFilter) return [...new Set(data.map((row) => row.Query))];
    return [
      ...new Set(
        data
          .filter(
            (row) =>
              row.Page === pageFilter && row.Impressions >= minImpressions
          )
          .map((row) => row.Query)
      ),
    ];
  }
);

export const pagesOptions = createSelector(
  [selectAllData, selectQueryFilter, selectMinPageImpressions],
  (data, queryFilter, minImpressions) => {
    if (!queryFilter) return [...new Set(data.map((row) => row.Page))];
    return [
      ...new Set(
        data
          .filter(
            (row) =>
              row.Query === queryFilter && row.Impressions >= minImpressions
          )
          .map((row) => row.Page)
      ),
    ];
  }
);
// Selector to get category options based on the selected query and page filters
export const categoryOptions = createSelector(
  [selectAllData, selectQueryFilter, selectPageFilter],
  (data, queryFilter, pageFilter) => {
    if (queryFilter) {
      data = data.filter((row) => row.Query === queryFilter);
    }
    if (pageFilter) {
      data = data.filter((row) => row.Page === pageFilter);
    }
    return [...new Set(data.map((row) => row.Cat1))];
  }
);
