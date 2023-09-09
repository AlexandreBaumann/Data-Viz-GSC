import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setPageFilter,
  setQueryFilter,
  setCategoryFilter,
  setTypeFilter,
  setMinQueryImpressions,
  setMinPageImpressions,
  setStartWeek,
  setEndWeek,
} from "./redux/filterSlice";
import { queriesOptions, pagesOptions } from "./redux/filterSelector";

const FilterForm = ({ filterOptions }) => {
  const dispatch = useDispatch();

  const availableQueries = useSelector(queriesOptions);
  const availablePages = useSelector(pagesOptions);

  const pageFilter = useSelector((state) => state.filter.pageFilter);
  const queryFilter = useSelector((state) => state.filter.queryFilter);
  const minQueryImpressions = useSelector(
    (state) => state.filter.minQueryImpressions
  );
  const minPageImpressions = useSelector(
    (state) => state.filter.minPageImpressions
  );
  const categoryFilter = useSelector((state) => state.filter.categoryFilter);
  const typeFilter = useSelector((state) => state.filter.typeFilter);
  const startWeek = useSelector((state) => state.filter.startWeek);
  const endWeek = useSelector((state) => state.filter.endWeek);

  return (
    <div className="App">
      <div className="filtres">
        <label>
          Start Week:
          <input
            type="number"
            value={startWeek}
            onChange={(e) => dispatch(setStartWeek(e.target.value))}
          />
        </label>
        <label>
          End Week:
          <input
            type="number"
            value={endWeek}
            onChange={(e) => dispatch(setEndWeek(e.target.value))}
          />
        </label>
        <label>
          Query Filter:
          <select
            value={queryFilter}
            onChange={(e) => dispatch(setQueryFilter(e.target.value))}
          >
            <option value="">None</option>
            {availableQueries.map((query, index) => (
              <option key={index} value={query}>
                {query}
              </option>
            ))}
          </select>
        </label>
        <label>
          Page Filter:
          <select
            value={pageFilter}
            onChange={(e) => dispatch(setPageFilter(e.target.value))}
          >
            <option value="">None</option>
            {availablePages.map((page, index) => (
              <option key={index} value={page}>
                {page}
              </option>
            ))}
          </select>
        </label>
        <label>
          Category Filter:
          <select
            value={categoryFilter}
            onChange={(e) => dispatch(setCategoryFilter(e.target.value))}
          >
            <option value="">None</option>
            {filterOptions.categories.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <label>
          Type Filter:
          <select
            value={typeFilter}
            onChange={(e) => dispatch(setTypeFilter(e.target.value))}
          >
            <option value="">None</option>
            {filterOptions.types.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <label>
          Min Query Impressions:
          <input
            type="number"
            value={minQueryImpressions}
            onChange={(e) => dispatch(setMinQueryImpressions(e.target.value))}
          />
        </label>
        <label>
          Min Page Impressions:
          <input
            type="number"
            value={minPageImpressions}
            onChange={(e) => dispatch(setMinPageImpressions(e.target.value))}
          />
        </label>
      </div>
    </div>
  );
};

export default FilterForm;
