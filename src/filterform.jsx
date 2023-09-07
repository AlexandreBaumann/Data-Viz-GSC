const FilterForm = ({
  queryFilter,
  pageFilter,
  setQueryFilter,
  setPageFilter,
  minQueryImpressions,
  setMinQueryImpressions,
  minPageImpressions,
  setMinPageImpressions,
  categoryFilter,
  setCategoryFilter,
  typeFilter,
  setTypeFilter,
  filterOptions,
  setStartWeek,
  setEndWeek,
  startWeek,
  endWeek,
}) => (
  <div className="App">
    <div className="filtres">
      <label>
        Start Week:
        <input
          type="number"
          value={startWeek}
          onChange={(e) => setStartWeek(e.target.value)}
        />
      </label>
      <label>
        End Week:
        <input
          type="number"
          value={endWeek}
          onChange={(e) => setEndWeek(e.target.value)}
        />
      </label>
      <label>
        Query Filter:
        <select
          value={queryFilter}
          onChange={(e) => setQueryFilter(e.target.value)}
        >
          <option value="">None</option>
          {filterOptions.queryOptions.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>
      <label>
        Page Filter:
        <select
          value={pageFilter}
          onChange={(e) => setPageFilter(e.target.value)}
        >
          <option value="">None</option>
          {filterOptions.pageOptions.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>
      <label>
        Category Filter:
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
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
          onChange={(e) => setTypeFilter(e.target.value)}
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
          onChange={(e) => setMinQueryImpressions(e.target.value)}
        />
      </label>
      <label>
        Min Page Impressions:
        <input
          type="number"
          value={minPageImpressions}
          onChange={(e) => setMinPageImpressions(e.target.value)}
        />
      </label>
    </div>
  </div>
);

export default FilterForm;
