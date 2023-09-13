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

// Additional selectors for the type filter
const selectTypeFilter = (state) => state.filter.typeFilter;

// Updated selector for category options
export const categoriesOptions = createSelector(
  [selectAllData, selectQueryFilter, selectPageFilter, selectTypeFilter],
  (data, queryFilter, pageFilter, typeFilter) => {
    // Filter based on the query filter
    if (queryFilter) {
      data = data.filter((row) => row.Query === queryFilter);
    }

    // Filter based on the page filter
    if (pageFilter) {
      data = data.filter((row) => row.Page === pageFilter);
    }

    // Filter based on the type filter
    if (typeFilter) {
      data = data.filter((row) => row.Type === typeFilter);
    }

    return [...new Set(data.map((row) => row.Cat1))];
  }
);

// Updated selector for type options
export const typeOptions = createSelector(
  [selectAllData, selectQueryFilter, selectPageFilter, selectCategoryFilter],
  (data, queryFilter, pageFilter, categoryFilter) => {
    // Filter based on the query filter
    if (queryFilter) {
      data = data.filter((row) => row.Query === queryFilter);
    }

    // Filter based on the page filter
    if (pageFilter) {
      data = data.filter((row) => row.Page === pageFilter);
    }

    // Filter based on the category filter
    if (categoryFilter) {
      data = data.filter((row) => row.Cat1 === categoryFilter);
    }

    return [...new Set(data.map((row) => row.Type))];
  }
);

// Updated selector for queries options
export const queriesOptions = createSelector(
  [
    selectAllData,
    selectPageFilter,
    selectCategoryFilter,
    selectTypeFilter,
    selectMinQueryImpressions,
  ],
  (data, pageFilter, categoryFilter, typeFilter, minImpressions) => {
    if (pageFilter) {
      data = data.filter((row) => row.Page === pageFilter);
    }
    if (categoryFilter) {
      data = data.filter((row) => row.Cat1 === categoryFilter);
    }
    if (typeFilter) {
      data = data.filter((row) => row.Type === typeFilter);
    }
    return [
      ...new Set(
        data
          .filter((row) => row.Impressions >= minImpressions)
          .map((row) => row.Query)
      ),
    ];
  }
);

// Updated selector for pages options
export const pagesOptions = createSelector(
  [
    selectAllData,
    selectQueryFilter,
    selectCategoryFilter,
    selectTypeFilter,
    selectMinPageImpressions,
  ],
  (data, queryFilter, categoryFilter, typeFilter, minImpressions) => {
    if (queryFilter) {
      data = data.filter((row) => row.Query === queryFilter);
    }
    if (categoryFilter) {
      data = data.filter((row) => row.Cat1 === categoryFilter);
    }
    if (typeFilter) {
      data = data.filter((row) => row.Type === typeFilter);
    }
    return [
      ...new Set(
        data
          .filter((row) => row.Impressions >= minImpressions)
          .map((row) => row.Page)
      ),
    ];
  }
);

export const selectConsolidatedData = (state) => {
  return {
    byQuery: state.consolidatedData.byQuery,
    byPage: state.consolidatedData.byPage,
  };
};
