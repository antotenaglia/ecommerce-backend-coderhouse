const { Console } = require('console')
const fs = require('fs')
fs.writeFileSync('./productos.txt', `LISTADO DE PRODUCTOS: \n`)
let id = 0 

class Contenedor {

    constructor () {
        this.object = []
    }
    
    save(title, price, thumnail) {
        id = id + 1
        this.object.push({title, price, thumnail, id})
        try {
            fs.appendFileSync('./productos.txt', `\n Title: ${title} \n Price: ${price} \n Thumnail: ${thumnail} \n Id: ${id} \n`)
            console.log('Id asignado a', title, ':', id)
        } catch (error) {
            console.log('Error al guardar productos en el archivo:', error)
        }
    }

    getById(id) {
        const findObject = this.object.find(object => object.id === id)
        if (findObject) {
            console.log(`El producto con id: ${id} es:`)
            console.log(findObject)
        } else {
            console.log (`Null - No se encuentra el producto con id: ${id}`)
        }
    }

    getAll() {
        console.log('LISTADO DE PRODUCTOS:')
        console.log(this.object)
    }

    deleteById(id) {
        try {
            const findObject = this.object.filter(object => object.id !== id)
            fs.writeFileSync('./productos.txt', `LISTADO DE PRODUCTOS: \n`)
            findObject.forEach((producto) => {
                fs.appendFileSync('./productos.txt', `\n Title: ${producto.title} \n Price: ${producto.price} \n Thumnail: ${producto.thumnail} \n Id: ${producto.id} \n`)
            })
            console.log(`Producto con id: ${id} borrado del archivo`)
        } catch (error) {
            console.log(`Error al borrar producto con id: ${id}: ${error}`)
        }
        
    }

    async deleteAll() {
        try {
            await fs.promises.unlink('./productos.txt')
            console.log('Productos borrados del archivo')
            fs.writeFileSync('./productos.txt', `LISTADO DE PRODUCTOS: \n`)
        } catch (error) {
            console.log('Error al borrar archivo:', error)
        }
    }
}

const productos = new Contenedor()
productos.save('Remera', 1465, 'https://articulo.mercadolibre.com.ar/MLA-1176235635-remera-lisa-jersey-premium-peinado-manga-corta-_JM?searchVariation=175410231753#searchVariation=175410231753&position=1&search_layout=grid&type=item&tracking_id=3c1f3ff9-adf9-4313-86ac-e7eb9b4e794f')
productos.save('Pantalón', 5490, 'https://articulo.mercadolibre.com.ar/MLA-901089177-pantalon-jogger-elastizado-tela-gabardina-_JM?searchVariation=70673583729#searchVariation=70673583729&position=4&search_layout=grid&type=item&tracking_id=547403d9-cc41-4eb8-92de-08ff7de22b66')
productos.save('Camisa', 4150, 'https://articulo.mercadolibre.com.ar/MLA-859207549-camisa-lisa-varios-colores-slim-fit-entallada-_JM?searchVariation=57077745991#searchVariation=57077745991&position=2&search_layout=grid&type=item&tracking_id=b025acf3-30d1-4eb1-8ec2-dbc9635ae8bf')
productos.getById(1)
productos.getById(4)
productos.getAll()
productos.deleteById(2)
productos.deleteAll()


