import Highcharts from 'highcharts';
import { ReactNode } from 'react';
import { ProsperitySymbol } from '../../models.ts';
import { useStore } from '../../store.ts';
import { Chart } from './Chart.tsx';

export interface EnvironmentChartProps {
  symbol: ProsperitySymbol;
}

export function EnvironmentChart({ symbol }: EnvironmentChartProps): ReactNode {
  const algorithm = useStore(state => state.algorithm)!;

  const sugarPriceData = [];
  const sunlightIndexData = [];

  for (const row of algorithm.data) {
    const observation = row.state.observations.conversionObservations[symbol];
    if (observation === undefined) {
      continue;
    }

    sugarPriceData.push([row.state.timestamp, observation.sugarPrice]);
    sunlightIndexData.push([row.state.timestamp, observation.sunlightIndex]);
  }

  const series: Highcharts.SeriesOptionsType[] = [
    { type: 'line', name: 'Sugar Price', marker: { symbol: 'square' }, yAxis: 0, data: sugarPriceData },
    { type: 'line', name: 'Sunlight Index', marker: { symbol: 'circle' }, yAxis: 1, data: sunlightIndexData },
  ];

  const options: Highcharts.Options = {
    yAxis: [{}, { opposite: true }],
  };

  return <Chart title={`${symbol} - Environment`} options={options} series={series} />;
}
