export const validSKUs = [
  {
    sku: "KDM516407/46/14",
    value: 8281
  },
  {
    sku: "OYG464088/98/45",
    value: 369
  },
  {
    sku: "LRT321244/74/76", // SKU id only in transactions.json
    value: -53
  }
];

export const transactionsBySKU = [
  {
    sku: "XOE089797/10/74",
    type: "refund",
    qty: 5
  },
  {
    sku: "XOE089797/10/74",
    type: "order",
    qty: 8
  },
  {
    sku: "XOE089797/10/74",
    type: "refund",
    qty: 0
  },
  {
    sku: "XOE089797/10/74",
    type: "refund",
    qty: 4
  },
  {
    sku: "XOE089797/10/74",
    type: "order",
    qty: 2
  },
  {
    sku: "XOE089797/10/74",
    type: "order",
    qty: 8
  },
  {
    sku: "XOE089797/10/74",
    type: "order",
    qty: 0
  },
  {
    sku: "XOE089797/10/74",
    type: "order",
    qty: 0
  },
  {
    sku: "XOE089797/10/74",
    type: "order",
    qty: 1
  }
];

export const stockLevelAfterTransactionsTests = [
  {
    sku: "test",
    initialStock: 5,
    transactions: [{ qty: 5, sku: "test", type: "refund" }],
    qty: 10
  },
  {
    sku: "test",
    initialStock: 5,
    transactions: [
      { qty: 5, sku: "test", type: "refund" },
      { qty: 2, sku: "test", type: "refund" },
      { qty: 3, sku: "test", type: "order" }
    ],
    qty: 9
  },
  //  Initial stock = 0
  {
    sku: "test",
    initialStock: 0,
    transactions: [{ qty: 5, sku: "test", type: "refund" }],
    qty: 5
  },
  //  Empty transactions
  {
    sku: "test",
    initialStock: 6,
    transactions: [],
    qty: 6
  }
];
