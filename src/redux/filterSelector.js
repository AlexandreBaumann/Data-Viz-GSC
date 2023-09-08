// filterSelector.js
import { createSelector } from "@reduxjs/toolkit";

// Sélecteur pour obtenir toutes les données
const selectAllData = (state) => state.csvData;

// Sélecteur pour obtenir le filtre de page actuel

const selectPageFilter = (state) => state.filter.pageFilter;
const selectQueryFilter = (state) => state.filter.queryFilter;
const selectMinQueryImpressions = (state) => state.filter.minQueryImpressions;
const selectMinPageImpressions = (state) => state.filter.minPageImpressions;

// Sélecteur pour obtenir les requêtes basées sur le filtre de page
export const selectQueriesForPage = createSelector(
  [selectAllData, selectPageFilter, selectMinQueryImpressions],
  (data, pageFilter, minImpressions) => {
    if (!pageFilter) return [];
    return data
      .filter(
        (row) =>
          row.Page === pageFilter && row.QueryImpressions >= minImpressions
      ) // en supposant que "QueryImpressions" est le champ pertinent
      .map((row) => row.Query);
  }
);

export const selectPagesForQuery = createSelector(
  [selectAllData, selectQueryFilter, selectMinPageImpressions],
  (data, queryFilter, minImpressions) => {
    if (!queryFilter) return [];
    return data
      .filter(
        (row) =>
          row.Query === queryFilter && row.PageImpressions >= minImpressions
      ) // en supposant que "PageImpressions" est le champ pertinent
      .map((row) => row.Page);
  }
);
