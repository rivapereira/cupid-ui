import React from 'react';
import Plot from 'react-plotly.js';

type SentimentChartProps = {
  positive: number;
  neutral: number;
  negative: number;
};

const SentimentChart: React.FC<SentimentChartProps> = ({ positive, neutral, negative }) => {
  const data = [
    {
      labels: ['Positive', 'Neutral', 'Negative'],
      values: [positive, neutral, negative],
      type: 'pie',
      hoverinfo: 'label+percent',
      textinfo: 'value+percent',
    },
  ];

  const layout = {
    title: 'Sentiment Distribution',
    height: 400,
    width: 500,
  };

  return (
    <div className="chart-container">
      <Plot data={data} layout={layout} />
    </div>
  );
};

export default SentimentChart;


const MatchScoreChart: React.FC<{ scores: number[]; names: string[] }> = ({ scores, names }) => {
    const data = [
      {
        x: names,
        y: scores,
        type: 'bar',
        marker: { color: 'rgb(255, 99, 132)' },
      },
    ];
  
    const layout = {
      title: 'Match Scores',
      xaxis: { title: 'Profiles' },
      yaxis: { title: 'Match Percentage' },
    };
  
    return <Plot data={data} layout={layout} />;
  };
  