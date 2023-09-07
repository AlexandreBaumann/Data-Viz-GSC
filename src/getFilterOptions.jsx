function getFilterOptions(csvData, minQueryImpressions, minPageImpressions) {
  const queryImpressions = {};
  const pageImpressions = {};
  const categories = {};
  const types = {};

  csvData.forEach((row) => {
    const query = row.Query;
    const page = row.Page;
    const category = row.Category;
    const type = row.Type;
    const impressions = parseFloat(row.Impressions);

    if (!isNaN(impressions)) {
      if (!queryImpressions[query]) {
        queryImpressions[query] = 0;
      }
      queryImpressions[query] += impressions;

      if (!pageImpressions[page]) {
        pageImpressions[page] = 0;
      }
      pageImpressions[page] += impressions;
    }

    if (category && !categories[category]) {
      categories[category] = true;
    }

    if (type && !types[type]) {
      types[type] = true;
    }
  });

  const queryOptions = Object.keys(queryImpressions)
    .filter((query) => queryImpressions[query] >= minQueryImpressions)
    .sort();

  const pageOptions = Object.keys(pageImpressions)
    .filter((page) => pageImpressions[page] >= minPageImpressions)
    .sort();

  const filterOptions = {
    queryOptions,
    pageOptions,
    categories: Object.keys(categories),
    types: Object.keys(types),
  };
  console.log(filterOptions); // Ici

  return filterOptions;
}
export default getFilterOptions;
