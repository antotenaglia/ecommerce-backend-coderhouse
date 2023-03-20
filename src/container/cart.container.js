import * as fs from 'fs';

//lógica para obtener lista de productos de "carts.txt"
class cartsContainer {
    constructor(route) {
      this.route = route;
    }

    async getCart() {
        try {
            const data = await fs.promises.readFile(this.route, "utf-8");
            return JSON.parse(data)
        } catch (error) {
            console.log("ERROR:", error)
            return [];
        }
    }

    async addProductToCart(product) {
        try {
            const cart = await this.getCart();
            //const { id } = req.params;
            //const { id_prod } = req.body;
            //const cart = carts.find((cart) => cart.id === Number(id)); 

            cart.products.push(product);
            await fs.promises.writeFile(this.route, JSON.stringify(cart, null, 2))
        } catch (error) {
            console.log("ERROR adding product to cart:", error)
        }     
    }        
}

export default cartsContainer;