import { Router } from "express";
import { controller } from "../controllers/index.js";
import passport from "passport";

const router = Router();

router
    .route("/login")
    .get(controller.serverLogin)
    .post(passport.authenticate("login", { failureRedirect: "/fail-login" }), controller.serverLogin)  

router
    .route("/register")
    .get(controller.getRegister)
    .post(passport.authenticate("register", { failureRedirect: "/fail-register" }), controller.postRegister)  

router
    .route("/fail-login")
    .get(controller.loginFailure)

router
    .route("/fail-register")
    .get(controller.registerFailure)

router
    .route("/logout")
    .get(controller.logout);

router
    .route("/info")
    .get(controller.info);

router
    .route("/randoms")
    .get(controller.randoms);

export default router;