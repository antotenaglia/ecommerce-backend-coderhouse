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
    .get(controller.serverRegister)
    .post(passport.authenticate("register", { failureRedirect: "/fail-register" }), controller.serverRegister)  

router
    .route("/fail-login")
    .get(controller.loginFailure)

router
    .route("/fail-register")
    .get(controller.registerFailure)

router
    .route("/logout")
    .get(controller.logout)

export default router;