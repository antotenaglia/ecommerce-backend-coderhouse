import { Router } from "express";
import * as fs from 'fs';
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import productsContainer from "../products.container.js";

const router = Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//obtiene productos del archivo "products.txt"
const products = new productsContainer(join(__dirname, "../../products.txt")); 
const productsList = await products.getAllProducts();

const cart = [];

//se definen métodos a partir de la ruta inicial "/api/cart"
router.route("/")
    //crea carrito y devuelve su id
    .post((req, res) => {       
        const { title, description, code, price, stock, thumbnail } = req.body; 
        let newId;

        if (cart.length == 0) {
            newId = 1;
        } else {
            newId = cart[cart.length - 1].id + 1;
        }

        const newCart = 
            {
                id: newId, 
                timestamp: Date.now(),
                products: [     
                    {
                        id: productsList[productsList.length - 1].id + 1,
                        title,
                        description,
                        code,
                        price,
                        stock,
                        thumbnail,
                        timestamp: Date.now(),
                    } 
                ],
            };
    
        cart.push(newCart);
            
        //se guardan los carritos en 'carts.txt'
        async function saveCarts() {
            try {
                await fs.promises.writeFile('carts.txt', JSON.stringify(cart, null, 2));
            } catch (error) {
                throw new Error(`Error al guardar producto en el archivo: ${error}`);
            }
        };  

        saveCarts();
    
        res.status(201).json({status: "Cart added", idCart: newCart.id, cart: cart});
    }); 

//se definen métodos a partir de la ruta "/api/cart/:id"
router.route("/:id")
    //elimina carrito según su id
    .delete((req, res) => {
        const { id } = req.params;
        const cartToDelete = cart.find((cart) => cart.id === Number(id));
        const indexCartToDelete = cart.indexOf(cartToDelete);
    
        if (!cartToDelete) {
        return res.status(404).json({error: 'Cart not found'})
        };
    
        cart.splice(indexCartToDelete, 1);
    
        res.status(200).json({status: "Cart deleted", cartDeleted: cartToDelete});
    });

//se definen métodos a partir de la ruta "/api/cart/:id/products"
router.route("/:id/products")
    //devuelve todos los productos del carrito segun id del carrito
    .get((req, res) => {
        const { id } = req.params;
        const cartFound = cart.find((cart) => cart.id === Number(id)); 
        const response = cartFound ? {status: "Cart found", products: cartFound.products} : {error: "Cart not found"}
        const statusCode = cartFound ? 200 : 404

        res.status(statusCode).json(response);
    })

    //agrega productos al carrito según id del producto   
    .post((req, res) => { 
        const { id } = req.params;
        const { id_prod } = req.body;
        const cartFound = cart.find((cart) => cart.id === Number(id)); 
        const productFound = productsList.find((product) => product.id === Number(id_prod));

        cartFound.products.push(productFound);
    
        res.status(201).json({status: "Product added to the cart:", idCart: id, productAdded: productFound});
    });

//se definen métodos a partir de la ruta "/api/cart/:id/products/:id_prod"
router.route("/:id/products/:id_prod")
    //elimina un producto según id del carrito y el id del producto
    .delete((req, res) => {
        const { id } = req.params;
        const { id_prod } = req.params;
        const cartToFind = cart.find((cart) => cart.id === Number(id));
        const productToDelete = cartToFind.products.find((product) => product.id === Number(id_prod)); 
        const indexProductToDelete = cartToFind.products.indexOf(productToDelete);
    
        if (!productToDelete) {
        return res.status(404).json({error: 'Product not found'})
        };
    
        cartToFind.products.splice(indexProductToDelete, 1);
    
        res.status(200).json({status: "Product deleted from cart:", idCart: id, productDeleted: productToDelete});
    });
    
export default router;


