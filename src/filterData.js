function filterData(csvData, queryFilter, pageFilter, categoryFilter, typeFilter) {
  return csvData.filter(row => {
    if (!row || typeof row.Query === 'undefined' || typeof row.Page === 'undefined') {
      console.error('Undefined property in row', row);
      
      return false;
    }
    
    const matchesQuery = queryFilter ? row.Query === queryFilter : true;
    const matchesPage = pageFilter ? row.Page === pageFilter : true;
    const matchesCategory = categoryFilter ? row.Category === categoryFilter : true;
    const matchesType = typeFilter ? row.Type === typeFilter : true;

    return matchesQuery && matchesPage && matchesCategory && matchesType;
  });
}

export default filterData;
