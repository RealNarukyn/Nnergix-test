import app from "./app";
import { CONF } from "./config";
import { DbController } from "./controller/db.controller";

(async () => await DbController.initDB())();

const PORT = CONF.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server running at: http://localhost:${CONF.PORT}`)
);
