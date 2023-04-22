import Router from "koa-router";
import { loginController } from "../controllers/login.controller.js";
import passport from "passport";
import uploadFileMiddleware from "../lib/multer.lib.js";

const router = new Router({
    prefix: "/login"
});

router.get("/", loginController.getLogin);
router.post("/", passport.authenticate("login", { failureRedirect: "/login/fail" }), uploadFileMiddleware.single("photo"), loginController.getLogin);  
router.get("/fail", loginController.getLoginFailure);

export const loginRouter = router;