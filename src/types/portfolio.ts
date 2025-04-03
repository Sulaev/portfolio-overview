export interface Asset {
  id: string;
  symbol: string;
  name: string;
  amount: number;
  price?: number;
  change24h?: number;
}
