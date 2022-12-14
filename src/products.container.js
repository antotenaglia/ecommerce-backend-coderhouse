import * as fs from 'fs';

//se obtiene lista de productos de "products.txt"
class productsContainer {
    constructor(ruta) {
      this.ruta = ruta;
    }

    async getAllProducts() {
        try {
            const data = await fs.promises.readFile(this.ruta, "utf-8");
            return JSON.parse(data)
        } catch (error) {
            console.log("ERROR!!", error)
        return [];
        }
    }

    // async saveProducts(product) {
    //     const productsList = await this.getAllProducts();
    //     let newId;

    //     if (productsList.length == 0) {
    //         newId = 1;
    //     } else {
    //         newId = productsList[productsList.length - 1].id + 1;
    //     }

    //     const newProduct = { ...product, id: newId };

    //     productsList.push(newProduct);
        
    //     try {
    //         await fs.promises.writeFile(this.ruta, JSON.stringify(productsList, null, 2));
    //     } catch (error) {
    //         throw new Error(`Error al guardar producto en el archivo: ${error}`);
    //     }
    // }
}

export default productsContainer;