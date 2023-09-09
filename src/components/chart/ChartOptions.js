const options = {
    scales: {
      y1: {
        type: 'linear',
        display: true,
        position: 'left',
        beginAtZero: true,
        title: {
          display: true,
          text: 'Clicks'
        }
      },
      y2: {
        type: 'linear',
        display: true,
        position: 'right',
        beginAtZero: true,
        title: {
          display: true,
          text: 'Impressions'
        },
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };
  
  export default options;
  