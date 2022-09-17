export interface StockLevel { 
  sku: string; 
  qty: number;
}

export interface StockType{
  sku: string;
  stock: number;
}

export interface TransactionType {
  sku: string;
  type: string;
  qty: number
}