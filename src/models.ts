export interface UserSummary {
  id: number;
  firstName: string;
  lastName: string;
}

export interface AlgorithmSummary {
  id: string;
  content: string;
  fileName: string;
  round: string;
  selectedForRound: boolean;
  status: string;
  teamId: string;
  timestamp: string;
  graphLog: string;
  user: UserSummary;
}

export type Time = number;
export type ProsperitySymbol = string;
export type Product = string;
export type Position = number;
export type UserId = string;
export type ObservationValue = number;

export interface ActivityLogRow {
  day: number;
  timestamp: number;
  product: Product;
  bidPrices: number[];
  bidVolumes: number[];
  askPrices: number[];
  askVolumes: number[];
  midPrice: number;
  profitLoss: number;
}

export interface Listing {
  symbol: ProsperitySymbol;
  product: Product;
  denomination: Product;
}

export interface ConversionObservation {
  bidPrice: number;
  askPrice: number;
  transportFees: number;
  exportTariff: number;
  importTariff: number;
  sugarPrice: number;
  sunlightIndex: number;
}

export interface Observation {
  plainValueObservations: Record<Product, ObservationValue>;
  conversionObservations: Record<Product, ConversionObservation>;
}

export interface Order {
  symbol: ProsperitySymbol;
  price: number;
  quantity: number;
}

export interface OrderDepth {
  buyOrders: Record<number, number>;
  sellOrders: Record<number, number>;
}

export interface Trade {
  symbol: ProsperitySymbol;
  price: number;
  quantity: number;
  buyer: UserId;
  seller: UserId;
  timestamp: Time;
}

export interface TradingState {
  timestamp: Time;
  traderData: string;
  listings: Record<ProsperitySymbol, Listing>;
  orderDepths: Record<ProsperitySymbol, OrderDepth>;
  ownTrades: Record<ProsperitySymbol, Trade[]>;
  marketTrades: Record<ProsperitySymbol, Trade[]>;
  position: Record<Product, Position>;
  observations: Observation;
}

export interface AlgorithmDataRow {
  state: TradingState;
  orders: Record<ProsperitySymbol, Order[]>;
  conversions: number;
  traderData: string;
  algorithmLogs: string;
  sandboxLogs: string;
}

export interface Algorithm {
  summary?: AlgorithmSummary;
  activityLogs: ActivityLogRow[];
  data: AlgorithmDataRow[];
}

export type CompressedListing = [symbol: ProsperitySymbol, product: Product, denomination: Product];

export type CompressedOrderDepth = [buyOrders: Record<number, number>, sellOrders: Record<number, number>];

export type CompressedTrade = [
  symbol: ProsperitySymbol,
  price: number,
  quantity: number,
  buyer: UserId,
  seller: UserId,
  timestamp: Time,
];

export type CompressedConversionObservation = [
  bidPrice: number,
  askPrice: number,
  transportFees: number,
  exportTariff: number,
  importTariff: number,
  sugarPrice: number,
  sunlightIndex: number,
];

export type CompressedObservations = [
  plainValueObservations: Record<Product, ObservationValue>,
  conversionObservations: Record<Product, CompressedConversionObservation>,
];

export type CompressedTradingState = [
  timestamp: Time,
  traderData: string,
  listings: CompressedListing[],
  orderDepths: Record<ProsperitySymbol, CompressedOrderDepth>,
  ownTrades: CompressedTrade[],
  marketTrades: CompressedTrade[],
  position: Record<Product, Position>,
  observations: CompressedObservations,
];

export type CompressedOrder = [symbol: ProsperitySymbol, price: number, quantity: number];

export type CompressedAlgorithmDataRow = [
  state: CompressedTradingState,
  orders: CompressedOrder[],
  conversions: number,
  traderData: string,
  logs: string,
];
