import { Router } from "express";
import { configController } from "../controllers/config.controller.js";

const router = Router();

router
    .route("/")
    .get(configController.getConfig);

export const configRouter = router;