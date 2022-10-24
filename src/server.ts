import app from "./app";
import { CONF } from "./config";
import { DbController } from "./controller/db.controller";

(async () => await DbController.initDB())();

app.listen(CONF.PORT, () =>
  console.log(`Server running at: http://localhost:${CONF.PORT}`)
);
