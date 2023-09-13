// Logique de consolidation par Query
export const consolidateByQuery = (data) => {
  const consolidated = {};
  data.forEach((row) => {
    const query = row.Query;
    if (!consolidated[query]) {
      consolidated[query] = {
        Clicks: 0,
        Impressions: 0,
      };
    }
    consolidated[query].Clicks += row.Clicks;
    consolidated[query].Impressions += row.Impressions;
  });
  return consolidated;
};

// Logique de consolidation par Page
export const consolidateByPage = (data) => {
  const consolidated = {};
  data.forEach((row) => {
    const page = row.Page;
    if (!consolidated[page]) {
      consolidated[page] = {
        Clicks: 0,
        Impressions: 0,
      };
    }
    consolidated[page].Clicks += row.Clicks;
    consolidated[page].Impressions += row.Impressions;
  });
  return consolidated;
};
