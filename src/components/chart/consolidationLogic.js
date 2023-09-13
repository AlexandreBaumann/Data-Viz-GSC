export const consolidateDataByQuery = (data) => {
  const consolidated = {};
  data.forEach((row) => {
    const key = row.Query;
    if (!consolidated[key]) {
      consolidated[key] = {
        Query: row.Query,
        Clicks: 0,
        Impressions: 0,
        TotalPosition: 0,
        Count: 0,
      };
    }
    consolidated[key].Clicks += parseInt(row.Clicks, 10);
    consolidated[key].Impressions += parseInt(row.Impressions, 10);
    consolidated[key].TotalPosition += parseFloat(row.Position);
    consolidated[key].Count += 1;
  });

  Object.keys(consolidated).forEach((key) => {
    consolidated[key].AveragePosition = Math.floor(
      consolidated[key].TotalPosition / consolidated[key].Count
    );
    delete consolidated[key].TotalPosition;
    delete consolidated[key].Count;
  });

  return Object.values(consolidated);
};

export const consolidateDataByPage = (data) => {
  const consolidated = {};
  data.forEach((row) => {
    const key = row.Page;
    if (!consolidated[key]) {
      consolidated[key] = {
        Page: row.Page,
        Clicks: 0,
        Impressions: 0,
        TotalPosition: 0,
        Count: 0,
      };
    }
    consolidated[key].Clicks += parseInt(row.Clicks, 10);
    consolidated[key].Impressions += parseInt(row.Impressions, 10);
    consolidated[key].TotalPosition += parseFloat(row.Position);
    consolidated[key].Count += 1;
  });

  Object.keys(consolidated).forEach((key) => {
    consolidated[key].AveragePosition = Math.floor(
      consolidated[key].TotalPosition / consolidated[key].Count
    );
    delete consolidated[key].TotalPosition;
    delete consolidated[key].Count;
  });

  return Object.values(consolidated);
};
