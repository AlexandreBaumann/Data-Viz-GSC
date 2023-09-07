function FormatData(preparedData) {
  const labels = preparedData.weeks;
  const clicksData = preparedData.clicks;
  const impressionsData = preparedData.impressions;
  const positionsData = preparedData.positions;

  return {
    labels,
    datasets: [
      {
        yAxisID: 'y1',
        label: 'Clicks',
        data: clicksData,
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
      },
      {
        yAxisID: 'y2',
        label: 'Impressions',
        data: impressionsData,
        fill: false,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
      },
      {
        yAxisID: 'y3',
        label: 'Position',
        data: positionsData,
        ticks: {
          reverse: true, // Cela inverse l'axe des y pour la position.
        },        
        fill: false,
        backgroundColor: 'rgba(255, 205, 86, 0.2)',
        borderColor: 'rgba(255, 205, 86, 1)',
      },
    ],
  };
}

export default FormatData;
