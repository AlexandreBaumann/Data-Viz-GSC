function prepareData(filteredData, startWeek, endWeek) {
  const clicksPerWeek = {};
  const impressionsPerWeek = {};
  const positionPerWeek = {};
  const positionCountPerWeek = {};
  const categories = {};
  const types = {};

  filteredData.forEach((row) => {
    const week = parseInt(row.Week, 10);
    const clicks = parseFloat(row.Clicks);
    const impressions = parseFloat(row.Impressions);
    const position = parseFloat(row.Position);
    const category = row.Cat1;
    const type = row.Type;
    if (week && !isNaN(clicks)) {
      if (clicksPerWeek[week] === undefined) {
        clicksPerWeek[week] = 0;
      }
      clicksPerWeek[week] += clicks;
    }

    if (week && !isNaN(impressions)) {
      if (impressionsPerWeek[week] === undefined) {
        impressionsPerWeek[week] = 0;
      }
      impressionsPerWeek[week] += impressions;
    }

    if (week && !isNaN(position)) {
      if (positionPerWeek[week] === undefined) {
        positionPerWeek[week] = 0;
        positionCountPerWeek[week] = 0;
      }
      positionPerWeek[week] += position;
      positionCountPerWeek[week] += 1;
    }
    if (category) {
      categories[category] = true;
    }
    if (type) {
      types[type] = true;
    }
  });

  const weeks = Array.from(
    { length: endWeek - startWeek + 1 },
    (_, i) => i + startWeek
  );
  const clicks = weeks.map((week) => clicksPerWeek[week] ?? 0);
  const impressions = weeks.map((week) => impressionsPerWeek[week] ?? 0);
  const positions = weeks.map(
    (week) =>
      (positionPerWeek[week] ?? 0) / (positionCountPerWeek[week] ?? 1) || 100
  );
  return { weeks, clicks, impressions, positions };
}

export default prepareData;
