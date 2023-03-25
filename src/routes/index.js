import { Router } from "express";
import { controller } from "../controllers/index.js";
import passport from "passport";
import compression from "compression";
import uploadFileMiddleware from "../lib/multer.lib.js";
import isAdmin from "../middleware/admin.mddleware.js";

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
    .route("/product-loading")
    .get(isAdmin, controller.loadingProducts);

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
    .route("*")
    .get(controller.getWarn);

export default router;