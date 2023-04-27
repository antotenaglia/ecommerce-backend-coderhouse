import Router from "koa-router";
import { registerController } from "../controllers/register.controller.js";
import uploadFileMiddleware from "../lib/multer.lib.js";

const router = new Router({
    prefix: "/register"
});

router.get("/", registerController.getRegister);
//router.post("/", uploadFileMiddleware.single("photo"), registerController.postRegister);
router.post("/", registerController.postRegister);

export const registerRouter = router;