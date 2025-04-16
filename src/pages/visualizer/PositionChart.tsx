import Highcharts from 'highcharts';
import { ReactNode } from 'react';
import { Algorithm, ProsperitySymbol } from '../../models.ts';
import { useStore } from '../../store.ts';
import { Chart } from './Chart.tsx';

function getLimit(algorithm: Algorithm, symbol: ProsperitySymbol): number {
  const knownLimits: Record<string, number> = {
    RAINFOREST_RESIN: 50,
    KELP: 50,
    SQUID_INK: 50,
    CROISSANTS: 250,
    JAMS: 350,
    DJEMBES: 60,
    PICNIC_BASKET1: 60,
    PICNIC_BASKET2: 100,
    VOLCANIC_ROCK: 400,
    VOLCANIC_ROCK_VOUCHER_9500: 200,
    VOLCANIC_ROCK_VOUCHER_9750: 200,
    VOLCANIC_ROCK_VOUCHER_10000: 200,
    VOLCANIC_ROCK_VOUCHER_10250: 200,
    VOLCANIC_ROCK_VOUCHER_10500: 200,
    MAGNIFICENT_MACARONS: 75,
  };

  if (knownLimits[symbol] !== undefined) {
    return knownLimits[symbol];
  }

  // This code will be hit when a new product is added to the competition and the visualizer isn't updated yet
  // In that case the visualizer doesn't know the real limit yet, so we make a guess based on the algorithm's positions

  const positions = algorithm.data.map(row => row.state.position[symbol] || 0);
  const minPosition = Math.min(...positions);
  const maxPosition = Math.max(...positions);

  return Math.max(Math.abs(minPosition), maxPosition);
}

export interface PositionChartProps {
  symbols: string[];
}

export function PositionChart({ symbols }: PositionChartProps): ReactNode {
  const algorithm = useStore(state => state.algorithm)!;

  const limits: Record<string, number> = {};
  for (const symbol of symbols) {
    limits[symbol] = getLimit(algorithm, symbol);
  }

  const data: Record<string, [number, number][]> = {};
  for (const symbol of symbols) {
    data[symbol] = [];
  }

  for (const row of algorithm.data) {
    for (const symbol of symbols) {
      const position = row.state.position[symbol] || 0;
      data[symbol].push([row.state.timestamp, (position / limits[symbol]) * 100]);
    }
  }

  const series: Highcharts.SeriesOptionsType[] = symbols.map((symbol, i) => ({
    type: 'line',
    name: symbol,
    data: data[symbol],

    // We offset the position color by 1 to make it line up with the colors in the profit / loss chart,
    // while keeping the "Total" line in the profit / loss chart the same color at all times
    colorIndex: (i + 1) % 10,
  }));

  return <Chart title="Positions (% of limit)" series={series} min={-100} max={100} />;
}
