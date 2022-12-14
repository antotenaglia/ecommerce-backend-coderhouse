import { Router } from "express";
import * as fs from 'fs';
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import productsContainer from "../products.container.js";
import cartContainer from "../cart.container.js";

const router = Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const products = new productsContainer(join(__dirname, "../../products.txt")); 
const productsList = await products.getAllProducts();

const cart = new cartContainer(join(__dirname, "../../carts.txt")); 
const cartList = await products.getAllProducts();

// //se define lista de productos
// const products = [
//     {
//         id: 1,
//         timestamp: Date.now(),
//         title: "Remera",
//         description: "Lisa manga corta",
//         code: 101,
//         price: 1465,
//         stock: 10,
//         thumbnail: "https://articulo.mercadolibre.com.ar/MLA-1176235635-remera-lisa-jersey-premium-peinado-manga-corta-_JM?searchVariation=175410231753#searchVariation=175410231753&position=1&search_layout=grid&type=item&tracking_id=3c1f3ff9-adf9-4313-86ac-e7eb9b4e794f",
//     },
//     {
//         id: 2,
//         timestamp: Date.now(),
//         title: "Pantalón",
//         description: "Largo elastizado",
//         code: 201,
//         price: 5490,
//         stock: 15,
//         thumbnail: "https://articulo.mercadolibre.com.ar/MLA-901089177-pantalon-jogger-elastizado-tela-gabardina-_JM?searchVariation=70673583729#searchVariation=70673583729&position=4&search_layout=grid&type=item&tracking_id=547403d9-cc41-4eb8-92de-08ff7de22b66",
//     },
//     {
//         id: 3,
//         timestamp: Date.now(),
//         title: "Camisa",
//         description: "Lisa entallada",
//         code: 301,
//         price: 4150,
//         stock: 7,
//         thumbnail: "https://articulo.mercadolibre.com.ar/MLA-859207549-camisa-lisa-varios-colores-slim-fit-entallada-_JM?searchVariation=57077745991#searchVariation=57077745991&position=2&search_layout=grid&type=item&tracking_id=b025acf3-30d1-4eb1-8ec2-dbc9635ae8bf",
//     },
// ];

//se define carrito
// const cart = [
//     {
//         id: 1, 
//         timestamp: Date.now(),
//         products: productsList,
//     }
// ];

//se definen métodos a partir de la ruta inicial "/api/cart"
router.route("/")
    //crea carrito y devuelve su id
    .post((req, res) => {       
        const { title, description, code, price, stock, thumbnail } = req.body; 

        const newCart = 
            {
                id: cartList[cartList.length - 1].id + 1, 
                timestamp: Date.now(),
                products: [     //cómo agrego varios productos?
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
    
        cartList.push(newCart);

        //se guardan los carritos en 'carts.txt'
        async function saveCarts() {
            try {
            await fs.promises.writeFile('../../carts.txt', JSON.stringify(cartList, null, 2));
            } catch (error) {
            throw new Error(`Error al guardar producto en el archivo: ${error}`);
            }
        };  

        saveCarts();
    
        res.status(201).json({status: "Cart added", idCart: newCart.id, cart: cartList});
    }); 

//se definen métodos a partir de la ruta "/api/cart/:id"
router.route("/:id")
    //elimina carrito según su id
    .delete((req, res) => {
        const { id } = req.params;
        const cartToDelete = cartList.find((cart) => cart.id === Number(id));
        const indexCartToDelete = cartList.indexOf(cartToDelete);
    
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
        const cartFound = cartList.find((cart) => cart.id === Number(id)); 
        const response = cartFound ? {status: "Cart found", products: cartFound.products} : {error: "Cart not found"}
        const statusCode = cartFound ? 200 : 404

        res.status(statusCode).json(response);
    })

    //agrega productos al carrito según id del producto   
    .post((req, res) => { 
        const { id } = req.params;
        const { id_prod } = req.body;
        const cartFound = cartList.find((cart) => cart.id === Number(id)); 
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
        const cartToFind = cartList.find((cart) => cart.id === Number(id));
        const productToDelete = cartToFind.products.find((product) => product.id === Number(id_prod)); 
        const indexProductToDelete = cartToFind.products.indexOf(productToDelete);
    
        if (!productToDelete) {
        return res.status(404).json({error: 'Product not found'})
        };
    
        cartToFind.products.splice(indexProductToDelete, 1);
    
        res.status(200).json({status: "Product deleted from cart:", idCart: id, productDeleted: productToDelete});
    });
    
export default router;


