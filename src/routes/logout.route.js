import { Router } from "express";
import { logoutController } from "../controllers/logout.controller.js";

const router = Router();

router
    .route("/")
    .get(logoutController.getLogout);


export const logoutRouter = router;