import { Router } from "express";
import MainController from "../controller/main.controller";

const router: Router = Router();

router.get("/", MainController.index);
router.post("/link", MainController.link);

router.delete("/collections", MainController.clearCollections);

export default router;
