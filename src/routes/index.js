import { Router } from "express";
import { controller } from "../controllers/index.js";

const router = Router();

router
    .route("/login")
    .get(controller.serverLogin)
    .post(controller.login)

router
    .route("/welcome")
    .get(controller.serverWelcome)

router
    .route("/logout")
    .get(controller.logout)

export default router;