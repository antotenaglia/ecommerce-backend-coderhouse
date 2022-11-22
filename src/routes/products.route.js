import { Router } from "express";
import uploadFileMiddleware from "../libs/multer.js";

const router = Router();

const products = [
  {
    id: 1,
    title: "Remera",
    price: 1465,
    thumbnail: "https://articulo.mercadolibre.com.ar/MLA-1176235635-remera-lisa-jersey-premium-peinado-manga-corta-_JM?searchVariation=175410231753#searchVariation=175410231753&position=1&search_layout=grid&type=item&tracking_id=3c1f3ff9-adf9-4313-86ac-e7eb9b4e794f",
  },
  {
    id: 2,
    title: "Pantalón",
    price: 5490,
    thumbnail: "https://articulo.mercadolibre.com.ar/MLA-901089177-pantalon-jogger-elastizado-tela-gabardina-_JM?searchVariation=70673583729#searchVariation=70673583729&position=4&search_layout=grid&type=item&tracking_id=547403d9-cc41-4eb8-92de-08ff7de22b66",
  },
  {
    id: 3,
    title: "Camisa",
    price: 4150,
    thumbnail: "https://articulo.mercadolibre.com.ar/MLA-859207549-camisa-lisa-varios-colores-slim-fit-entallada-_JM?searchVariation=57077745991#searchVariation=57077745991&position=2&search_layout=grid&type=item&tracking_id=b025acf3-30d1-4eb1-8ec2-dbc9635ae8bf",
  },
];


//se definen rutas, a partir de la inicial: "/api/products"
router.route("/")

//devuelve todos los productos
.get((req, res) => {
  res.json({status: "ok", data:products})
})


//recibe y agrega un producto, y lo devuelve con su id asignado
.post(uploadFileMiddleware.single("productImage"), (req, res) => { //single aclara que es una imagen
  const { title, price } = req.body;
  const thumbnail = req.file;
  const newProduct = {
    id: products[products.length - 1].id + 1,
    title,
    price,
    thumbnail: `http://localhost:8080/images/${thumbnail.originalname}`,
  }
  
  products.push(newProduct)
  
  res.status(201).json({status: "created", data: newProduct}) 
}) 


//se definen rutas, a partir de la inicial + id
router.route("/:id")

//devuelve un producto según su id
.get((req, res) => {
  const {id} = req.params;
  const productFound = products.find((product) => product.id === Number(id)) 
  const response = productFound ? {status: "found", data: productFound} : {error: "not found"}
  const statusCode = productFound ? 200 : 404

  res.status(statusCode).json(response)
})

//recibe y actualiza un producto según su id
.put((req, res) => {
  const {id} = req.params;
  const {title, price} = req.body;
  const indexProductToUpdate = products.find((product) => product.id === Number(id)) 
  
  if (!indexProductToUpdate) {
    return res.status(404).json({error: 'product not found'})
  }

  products.splice(indexProductToUpdate, 1, {id, title, price})

  res.status(200).json({status: "updated", data: {id, title, price}})
})

//elimina un producto según su id
.delete((req, res) => {
  const {id} = req.params;
  const productToDelete = products.find((product) => product.id === Number(id)) 
  console.log("productToDelete", productToDelete)
  const indexProductToDelete = products.indexOf(productToDelete)
  console.log("indexProductToDelete",indexProductToDelete)

  if (!productToDelete) {
    return res.status(404).json({error: 'producto no encontrado'})
  }

  products.splice(indexProductToDelete, 1)

  res.status(200).json({status: "deleted", data: productToDelete})
})
  

export default router;


