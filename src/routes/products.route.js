import { Router } from "express";
import * as fs from 'fs';
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import productsContainer from "../products.container.js";

const router = Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let administrator = true; 

//obtiene productos del archivo "products.txt"
const products = new productsContainer(join(__dirname, "../../products.txt")); 
let productsList = await products.getAllProducts();
productsList.forEach(element => {
    element.timestamp = Date.now()
});

//se definen métodos a partir de la ruta inicial "/api/products"
router.route("/")
    //muestra productos
    .get((req, res) => {
        res.status(200).json({status: "Ok", productsList: productsList}); 
    })

    //agrega productos 
    .post((req, res) => { 
        if (administrator) {
            const { title, description, code, price, stock, thumbnail } = req.body;
            const newProduct = {
                id: productsList[productsList.length - 1].id + 1,
                title,
                description,
                code,
                price,
                stock,
                thumbnail,
                timestamp: Date.now(),
            };

            productsList.push(newProduct);

            async function saveProducts() {
                try {
                    await fs.promises.writeFile('products.txt', JSON.stringify(productsList, null, 2));
                } catch (error) {
                    throw new Error(`Error al guardar producto en el archivo: ${error}`);
                }
            };  
  
            saveProducts();
  
            res.status(201).json({status: "Product added", productAdded: newProduct}); 
        } else {
            return res.status(404).json({error: -1, description: 'método POST no autorizado'});
        };
    }); 

//se definen métodos a partir de la ruta "/api/products/:id"
router.route("/:id")
    //devuelve todos los productos o un producto según su id 
    .get((req, res) => {
        const { id } = req.params;
        const productFound = productsList.find((product) => product.id === Number(id)) 
        const response = productFound ? {status: "Product found", product: productFound} : {error: "Product not found", productList: productsList}
        const statusCode = productFound ? 200 : 404
        
        res.status(statusCode).json(response);
    })

    //actualiza un producto según su id 
    .put((req, res) => {
        if (administrator) {
            const { id } = req.params;
            const { title, description, code, price, stock, thumbnail } = req.body;
            const productUpdated = {
                id: Number(id),
                title,
                description,
                code,
                price,
                stock,
                thumbnail,
                timestamp: Date.now(),
            };
            const productToUpdate = productsList.find((product) => product.id === Number(id));
            const indexProductToUpdate = productsList.indexOf(productToUpdate);

            if (!indexProductToUpdate) {
            return res.status(404).json({error: 'Product not found'})
            };
        
            productsList.splice(indexProductToUpdate, 1, productUpdated);
        
            res.status(200).json({status: "Product updated", product: productUpdated});
        } else {
            return res.status(404).json({error: -1, description: 'método PUT no autorizado'})
        }
    })

    //elimina un producto según su id 
    .delete((req, res) => {
        if (administrator) {
            const { id } = req.params;
            const productToDelete = productsList.find((product) => product.id === Number(id));
            const indexProductToDelete = productsList.indexOf(productToDelete);
        
            if (!productToDelete) {
            return res.status(404).json({error: 'Product not found'})
            };
        
            productsList.splice(indexProductToDelete, 1);
        
            res.status(200).json({status: "Product deleted", product: productToDelete});
        } else {
            return res.status(404).json({error: -1, description: 'método DELETE no autorizado'})
        }
    });

export default router;



