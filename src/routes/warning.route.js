import { Router } from "express";
import { warningController } from "../controllers/warning.controller.js";

const router = Router();

router
    .route("*")
    .get(warningController.getWarningNotRoute);

export const warningRouter = router;