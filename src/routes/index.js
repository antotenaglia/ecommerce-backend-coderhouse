import { Router } from "express";

const router = Router();

const products = [
    {
      name: "Remera",
      price: 4465,
      thumbnail: "https://cdn2.iconfinder.com/data/icons/line-color-mix-vol-4-1/128/line-24-256.png",
    },
    {
      name: "Pantalón",
      price: 5490,
      thumbnail: "https://cdn3.iconfinder.com/data/icons/fashion-beauty-vol-1/512/trousers_pants_tactical_cargo-256.png",
    },
    {
      name: "Guantes",
      price: 1150,
      thumbnail: "https://cdn3.iconfinder.com/data/icons/spring-2-1/30/Gloves-256.png",
    },
];

//se define que la ruta "/" renderice productForm: formulario de carga de productos
router.get("/", (req, res) => {
    res.render("productForm")
});

//se define que la ruta "/products" reciba el post y rediriga a la ruta "/": formulario de carga de productos 
router.post("/products", (req, res) => {
    const { name, price, thumbnail } = req.body;

    products.push({name, price, thumbnail});
    
    res.redirect("/");
});

//se define que la ruta "/products" renderice products: vista de productos cargados
router.get("/products", (req, res) => {
    res.render("products", {products})
});


export default router;