export interface IWebSocketData {
  type: string;
  code: string;
  timestamp: number;
  trade_date: string;
  trade_time: string;
  trade_timestamp: number;
  trade_price: number;
  trade_volume: number;
  ask_bid: string;
  prev_closing_price: number;
  change: string;
  change_price: number;
  change_rate: number;
  sequential_id: number;
  stream_type: string;
}
