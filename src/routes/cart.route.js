import { Router } from "express";

const router = Router();

const cart = [];
const id = 0;

//se definen métodos a partir de la ruta inicial "/api/cart"
router.route("/")
    //crea carrito y devuelve su id
    .post((req, res) => {        
        const newCart = [
            {
                id: cart[cart.length - 1].id + 1, 
                timestamp: Date.now(),
                products: {products},
            }
        ];
    
        cart.push(newCart)
    
        res.status(201).json({status: "Cart added", id: cart.id}) 
    }) 

//se definen métodos a partir de la ruta "/api/cart/:id"
router.route("/:id")
    //elimina carrito según su id
    .delete((req, res) => {
        const { id } = req.params;
        const cartToDelete = cart.find((cart) => cart.id === Number(id)) 
        const indexCartToDelete = cart.indexOf(cartToDelete)
    
        if (!cartToDelete) {
        return res.status(404).json({error: 'Cart not found'})
        }
    
        cart.splice(indexProductToDelete, 1)
    
        res.status(200).json({status: "Cart deleted", data: cartToDelete})
    })

//se definen métodos a partir de la ruta "/api/cart/:id/products"
router.route("/:id/products")
    //devuelve todos los productos del carrito segun su id
    .get((req, res) => {
        const { id } = req.params;
        const cartFound = cart.find((cart) => cart.id === Number(id)) 
        const response = cartFound ? {status: "Cart found", data: cart.products} : {error: "Cart not found"}
        const statusCode = productFound ? 200 : 404

        res.status(statusCode).json(response)
    })

    //agrega productos al carrito según id del producto
    .post((req, res) => { 
        const { id } = req.params;
        const { title, description, code, price, stock, thumbnail } = req.body;
        const newProduct = {
            
            id: products[products.length - 1].id + 1,
            timestamp: Date.now(),
            title,
            description,
            code,
            price,
            stock,
            thumbnail,
        }
    
        products.push(newProduct)
    
        res.status(201).json({status: "Product added", data: newProduct}) 
    }) 



export default cartRouter;


