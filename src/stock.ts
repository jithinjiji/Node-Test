import constants from "./constants";
import { StockLevel, StockInfo, TransactionInfo } from "./types"

/**
 * Returns the initial stock for the provided SKU
 * 
 * @param sku Product SKU
 * @returns Initial stock
 */
export async function getInitialStockBySKU(sku: string): Promise<StockInfo | undefined> {
  const stockLoader = import('../stock.json');
  const stocks: StockInfo[] = (await stockLoader).default ?? [];
  return stocks.find(stock => stock.sku === sku)
}

/**
 * Lists all the transactions for the provided SKU
 * 
 * @param sku Product SKU
 * @returns Transactions
 */
export async function getTransactionsBySKU(sku: string): Promise<TransactionInfo[]> {
  const transactionLoader = import('../transactions.json');
  const transactions: TransactionInfo[] = (await transactionLoader).default ?? [];
  return transactions.filter(transaction => transaction.sku === sku)
}

/**
 * Applies transactions to the initial stock and returns the final stock level
 * 
 * @param sku Product SKU
 * @param initialStock Initial stock of the provided SKU
 * @param transactions Transactions
 * @returns Final stock level
 */
export function getStockLevelAfterTransactions(
  sku: string,
  initialStock: number,
  transactions: TransactionInfo[]
): StockLevel {
  let qty = initialStock;

  transactions.forEach(transaction => {
    switch (transaction.type) {
      case constants.TRANSACTION_TYPE_ORDER:
        qty -= transaction.qty
        break;
      case constants.TRANSACTION_TYPE_REFUND:
        qty += transaction.qty
        break;
    }
  })

  return {
    sku,
    qty
  }
}

/**
 * Returns the current stock level for the provided SKU code.
 * 
 * @param sku SKU code
 */
export async function getCurrentStockLevelBySKU(sku: string): Promise<StockLevel> {
  let initialStock: StockInfo | undefined;
  let transactions: TransactionInfo[];
  [initialStock, transactions] = await Promise.all([
    getInitialStockBySKU(sku),
    getTransactionsBySKU(sku)
  ])

  if (initialStock || transactions.length) {
    return getStockLevelAfterTransactions(
      sku,
      initialStock?.stock ?? 0,
      transactions
    );
  }
  throw new Error(constants.ERR_SKU_NOT_FOUND);
}