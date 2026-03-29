import chalk from "chalk";
import app from "./app.js";

app.listen(3000, () => {
  // osluskivanje servera na odredjenom portu radi pokretanja istog
  console.log(chalk.blue("Started on port 3000"));
});
