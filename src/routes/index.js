import { Router } from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const router = Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//se define que la ruta "/" renderice los productos con handlebars
router.get("/", (req, res) => {
    res.render(join(__dirname, "../views/partials/products.hbs"))
});

export default router;


