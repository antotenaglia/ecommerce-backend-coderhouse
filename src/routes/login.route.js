import { Router } from "express";
import { loginController } from "../controllers/login.controller.js";
import passport from "passport";
import uploadFileMiddleware from "../lib/multer.lib.js";

const router = Router();

router
    .route("/")
    .get(loginController.getLogin)
    .post(passport.authenticate("login", { failureRedirect: "/login/fail" }), uploadFileMiddleware.single("photo"), loginController.getLogin);  

router
    .route("/fail")
    .get(loginController.getLoginFailure);


export const loginRouter = router;