import Router from "koa-router";
import { indexController } from "../controllers/index.controller.js";

const router = new Router({
    prefix: "/index"
});

router.get("/", indexController.getIndex);

export const indexRouter = router;