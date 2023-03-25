import * as fs from 'fs';

//lógica para obtener lista de productos de "products.txt"
class productsContainer {
    constructor(route) {
      this.route = route;
    }

    async getAllProducts() {
        try {
            const data = await fs.promises.readFile(this.route, "utf-8");
            return JSON.parse(data)
        } catch (error) {
            console.log("ERROR:", error)
            return [];
        }
    }  
}

export default productsContainer;