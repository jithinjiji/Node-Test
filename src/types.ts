export interface StockLevel { 
  sku: string; 
  qty: number;
}

export interface StockInfo{
  sku: string;
  stock: number;
}

export interface TransactionInfo {
  sku: string;
  type: string;
  qty: number
}