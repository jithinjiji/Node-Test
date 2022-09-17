import { expect } from "chai";
import {
  getCurrentStockLevelBySKU,
  getInitialStockBySKU,
  getStockLevelAfterTransactions,
  getTransactionsBySKU
} from "../src/stock"
import {
  stockLevelAfterTransactionsTests,
  transactionsBySKU, validSKUs
} from "./mock";

describe("getCurrentStockLevelBySKU function", () => {
  it("should return the stock level for valid SKU codes", async () => {
    await Promise.all(validSKUs.map(async (validSKU) => {
      const stockLevel = await getCurrentStockLevelBySKU(validSKU.sku)
      expect(stockLevel.qty).to.be.equals(validSKU.value)
    }))
  })
  it("should throw errors for invalid SKU codes", () => {
    return getCurrentStockLevelBySKU("scSCS")
      .then((_) => { throw new Error('was not supposed to succeed'); })
      .catch((error) => { expect(error).to.an.instanceOf(Error); })
  })
});

describe("getInitialStockBySKU function", () => {
  it("should return the initial stock for a valid SKU", () => {
    return getInitialStockBySKU("NMK838808/89/94").then(value => {
      expect(value).to.deep.equals(
        {
          sku: "NMK838808/89/94",
          stock: 9842
        }
      )
    })
  })
  it("should return undefined for an unknown SKU", () => {
    return getInitialStockBySKU("INVALID_SKU")
      .then(value => {
        expect(value).to.be.undefined
      })
  })
});

describe("getTransactionsBySKU function", () => {
  it("should return the transactions for a valid SKU", () => {
    return getTransactionsBySKU("XOE089797/10/74")
      .then(value => {
        expect(value).to.deep.equals(transactionsBySKU)
      })
  })
  it("should return empty for an unknown SKU", () => {
    return getTransactionsBySKU("INVALID_SKU")
      .then(value => {
        expect(value).to.deep.equals([])
      })
  })
});

describe("getStockLevelAfterTransactions function", () => {
  it("should return the correct stock level", () => {
    stockLevelAfterTransactionsTests.forEach((test) => {
      expect(
        getStockLevelAfterTransactions(
          test.sku,
          test.initialStock,
          test.transactions
        )
      ).to.deep.equals({
        sku: test.sku,
        qty: test.qty
      })
    })
  })
});
