import * as readline from 'readline';
import { getCurrentStockLevelBySKU } from './stock';

let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("Please enter an SKU Id:", (sku) => {
  getCurrentStockLevelBySKU(sku)
    .then(console.log)
    .catch(console.log);
  rl.close();
})
