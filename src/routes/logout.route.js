import Router from "koa-router";
import { logoutController } from "../controllers/logout.controller.js";

const router = new Router({
    prefix: "/logout"
});

router.get("/", logoutController.getLogout);

export const logoutRouter = router;