import { Router } from "express";
import { controller } from "../controllers/index.js";
import passport from "passport";
import compression from "compression";
import uploadFileMiddleware from "../lib/multer.lib.js";

const router = Router();

router
    .route("/")
    .get(controller.getIndex)

router
    .route("/login")
    .get(controller.getLogin)
    .post(passport.authenticate("login", { failureRedirect: "/fail-login" }), uploadFileMiddleware.single("photo"), controller.getLogin);  

router
    .route("/register")
    .get(controller.getRegister)
    //.post(passport.authenticate("register", { failureRedirect: "/fail-register" }), controller.postRegister);   
    .post(uploadFileMiddleware.single("photo"), controller.postRegister);

router
    .route("/fail-login")
    .get(controller.getLoginFailure);

router
    .route("/fail-register")
    .get(controller.getRegisterFailure);

router
    .route("/products")
    .get(controller.getProducts);

router
    .route("/cart")
    .get(controller.getCart)
    .post(controller.postCart);

router
    .route("/cart/purchase")
    .get(controller.getCartPurchase);

router
    .route("/logout")
    .get(controller.getLogout);

router
    .route("/info-nodebug")
    .get(compression(), controller.getInfoNoDebug);

router
    .route("/api/randoms")
    .get(controller.getRandoms);

router
    .route("*")
    .get(controller.getWarn);

export default router;