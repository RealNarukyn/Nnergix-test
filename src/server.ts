import app from "./app";
import { filterURLs } from "./utils";
import MainController from "./controller/main.controller";
import { CONF } from "./config";
import { DbController } from "./controller/db.controller";

const initServer = async () => {
  await DbController.initDB();

  // Case 0: We get arguments passed throught
  if (process.env["DOCKER_URL"]) {
    const urlList = filterURLs(process.env["DOCKER_URL"]);

    // If they're valid url's ==> C O N T I N U E...
    if (urlList.length > 0) {
      const links = await Promise.all(
        urlList.map(async (url) => await MainController.linkCmd(url))
      );
      console.info(links);

      process.exit();
    }
  }

  // Case 1: We get NO arguments and we start the server
  const PORT = CONF.PORT || 3000;
  app.listen(PORT, () =>
    console.log(`Server running at: http://localhost:${CONF.PORT}`)
  );
};

// Run the code asynchronously
(async () => await initServer())();
