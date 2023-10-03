export const consolidateDataByQuery = (data) => {
  const consolidated = data.reduce((acc, row) => {
    const key = row.Query;
    if (!acc[key]) {
      acc[key] = {
        Query: row.Query,
        Clicks: 0,
        Impressions: 0,
        TotalPosition: 0,
        Count: 0,
      };
    }
    acc[key].Clicks += parseInt(row.Clicks, 10);
    acc[key].Impressions += parseInt(row.Impressions, 10);
    acc[key].TotalPosition += parseFloat(row.Position);
    acc[key].Count += 1;
    return acc;
  }, {});

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
  const consolidated = data.reduce((acc, row) => {
    const key = row.Page;
    if (!acc[key]) {
      acc[key] = {
        Page: row.Page,
        Clicks: 0,
        Impressions: 0,
        TotalPosition: 0,
        Count: 0,
      };
    }
    acc[key].Clicks += parseInt(row.Clicks, 10);
    acc[key].Impressions += parseInt(row.Impressions, 10);
    acc[key].TotalPosition += parseFloat(row.Position);
    acc[key].Count += 1;
    return acc;
  }, {});

  Object.keys(consolidated).forEach((key) => {
    consolidated[key].AveragePosition = Math.floor(
      consolidated[key].TotalPosition / consolidated[key].Count
    );
    delete consolidated[key].TotalPosition;
    delete consolidated[key].Count;
  });

  return Object.values(consolidated);
};
