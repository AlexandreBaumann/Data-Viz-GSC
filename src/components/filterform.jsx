import style from "./filterform.module.scss";
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
} from "../redux/filterSlice";
import {
  pagesOptions,
  queriesOptions,
  categoriesOptions,
  typeOptions,
} from "../redux/filterSelector";
import { applyFilters } from "../redux/filteredDataSlice";

const FilterForm = () => {
  const dispatch = useDispatch();
  const handleFilterButtonClick = () => {
    dispatch(applyFilters());
  };

  const availableQueries = useSelector(queriesOptions);
  const availablePages = useSelector(pagesOptions);
  const availableCategories = useSelector(categoriesOptions);
  const availableTypes = useSelector(typeOptions);

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

  const handleResetButtonClick = () => {
    dispatch(setPageFilter(""));
    dispatch(setQueryFilter(""));
    dispatch(setCategoryFilter(""));
    dispatch(setTypeFilter(""));
    dispatch(setMinQueryImpressions(0));
    dispatch(setMinPageImpressions(0));
  };

  return (
    <div className={style.filtres}>
      <div className={style.requete}>
        <label>
          Query:
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
          Page:
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
      </div>
      <div className={style.categorie}>
        <label>
          Category:
          <select
            value={categoryFilter}
            onChange={(e) => dispatch(setCategoryFilter(e.target.value))}
          >
            <option value="">None</option>
            {availableCategories.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <label>
          Type:
          <select
            value={typeFilter}
            onChange={(e) => dispatch(setTypeFilter(e.target.value))}
          >
            <option value="">None</option>
            {availableTypes.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className={style.impressions}>
        <label>
          Impressions min. (Query):
          <input
            type="number"
            value={minQueryImpressions}
            onChange={(e) => dispatch(setMinQueryImpressions(e.target.value))}
          />
        </label>
        <label>
          Impressions min. (Page):
          <input
            type="number"
            value={minPageImpressions}
            onChange={(e) => dispatch(setMinPageImpressions(e.target.value))}
          />
        </label>
      </div>
      <div className={style.semaine}>
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
      </div>
      <div className={style.buttonDiv}>
        <button
          className={style.applyButton}
          type="button"
          onClick={handleFilterButtonClick}
        >
          Apply filters
        </button>

        <button
          className={style.resetButton}
          type="button"
          onClick={handleResetButtonClick}
        >
          Reset filters
        </button>
      </div>
    </div>
  );
};

export default FilterForm;
