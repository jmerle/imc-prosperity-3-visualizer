import { format } from 'date-fns';

export function formatNumber(value: number, decimals: number = 0): string {
  return Number(value).toLocaleString(undefined, {
    minimumFractionDigits: decimals > 0 ? decimals : 0,
    maximumFractionDigits: decimals > 0 ? decimals : 0,
  });
}

export function formatTimestamp(timestamp: string): string {
  return format(Date.parse(timestamp), 'yyyy-MM-dd HH:mm:ss') + ' (local time)';
}
