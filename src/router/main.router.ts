import { Router } from "express";
import MainController from "../controller/main.controller";

const router: Router = Router();

router.get("/", MainController.index);
router.get("/link", MainController.link);

export default router;
