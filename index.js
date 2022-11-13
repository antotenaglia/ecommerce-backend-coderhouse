const fs = require("fs");

const producto1 = {
  title: "Remera",
  price: 1465,
  thumbnail:
    "https://articulo.mercadolibre.com.ar/MLA-1176235635-remera-lisa-jersey-premium-peinado-manga-corta-_JM?searchVariation=175410231753#searchVariation=175410231753&position=1&search_layout=grid&type=item&tracking_id=3c1f3ff9-adf9-4313-86ac-e7eb9b4e794f",
};
const producto2 = {
  title: "Pantalón",
  price: 5490,
  thumbnail:
    "https://articulo.mercadolibre.com.ar/MLA-901089177-pantalon-jogger-elastizado-tela-gabardina-_JM?searchVariation=70673583729#searchVariation=70673583729&position=4&search_layout=grid&type=item&tracking_id=547403d9-cc41-4eb8-92de-08ff7de22b66",
};
const producto3 = {
  title: "Camisa",
  price: 4150,
  thumbnail:
    "https://articulo.mercadolibre.com.ar/MLA-859207549-camisa-lisa-varios-colores-slim-fit-entallada-_JM?searchVariation=57077745991#searchVariation=57077745991&position=2&search_layout=grid&type=item&tracking_id=b025acf3-30d1-4eb1-8ec2-dbc9635ae8bf",
};

class Contenedor {
  constructor(ruta) {
    this.ruta = ruta;
  }

  async save(object) {
    const listado = await this.getAll();

    let nuevoId;

    if (listado.length == 0) {
      nuevoId = 1;
    } else {
      nuevoId = listado[listado.length - 1].id + 1;
    }

    const nuevoObjeto = { ...object, id: nuevoId };

    listado.push(nuevoObjeto);

    try {
      await fs.promises.writeFile(this.ruta, JSON.stringify(listado, null, 2));
      return nuevoId;
    } catch (error) {
      throw new Error(`Error al guardar producto en el archivo: ${error}`);
    }
  }

  async getById(id) {
    try {
      const listado = await this.getAll();
      return listado.find((object) => object.id === id) ?? null;
    } catch (error) {
      throw new Error(`No se encuentra el producto con id: ${id}`);
    }
  }

  async getAll() {
    try {
      const data = await fs.promises.readFile(this.ruta, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }
}

async function main() {
  const productos = new Contenedor("./productos.txt");

  //GUARDA OBJETOS
  await productos.save(producto1);
  await productos.save(producto2);
  await productos.save(producto3);

  //DEVUELVE ARRAY CON TODOS LOS OBJETOS
  let all = await productos.getAll();

  //BUSCA POR ID RANDOM
  let idRandom = Math.floor(Math.random() * 3 + 1);
  let buscaIdRandom = await productos.getById(idRandom);

  //CREA SERVIDOR
  const express = require("express");
  const app = express();
  const port = 8080;
  const connectedServer = app.listen(port, () => {
    console.log(
      `Servidor HTTP escuchando en el puerto ${connectedServer.address().port}`
    );
  });
  connectedServer.on("error", (error) =>
    console.log(`Error en el servidor: ${error}`)
  );

  //CREA ENDPOINTS
  app.get("/productos", (peticion, respuesta) => {
    respuesta.send(all);
  });

  app.get("/productoRandom", (peticion, respuesta) => {
    respuesta.send(buscaIdRandom);
  });
}

main();
