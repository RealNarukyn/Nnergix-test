import app from "./app";
import { regexURL } from "./utils";
// import MainController from "./controller/main.controller";
import { CONF } from "./config";
import { DbController } from "./controller/db.controller";

(async () => await DbController.initDB())();

// Check if we get arguments and they're
const argPass: string[] = process.argv.filter((arg) => regexURL.test(arg));
console.log(argPass);

// Case 0: We get arguments passed throught
// if (argPass.length > 0) {
//   console.log(argPass);
//   (async () =>
//     await Promise.all(
//       argPass.map(async (url) => await MainController.linkCmd(url))
//     ))();

//   process.exit();
// }

// Case 1: We get NO arguments and we start the server
const PORT = CONF.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server running at: http://localhost:${CONF.PORT}`)
);
