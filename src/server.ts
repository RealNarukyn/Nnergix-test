import app from "./app";
import { CONF } from "./config";

app.listen(CONF.PORT, () =>
  console.log(`Server running at: http://localhost:${CONF.PORT}`)
);
