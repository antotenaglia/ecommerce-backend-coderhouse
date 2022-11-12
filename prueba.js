const Contenedor = require("./index.js");

const producto1 = {
  title: "Remera",
  price: 1465,
  thumbnail:
    "https://articulo.mercadolibre.com.ar/MLA-901089177-pantalon-jogger-elastizado-tela-gabardina-_JM?searchVariation=70673583729#searchVariation=70673583729&position=4&search_layout=grid&type=item&tracking_id=547403d9-cc41-4eb8-92de-08ff7de22b66",
};

const producto2 = {
  title: "Pantalón",
  price: 5490,
  thumbnail:
    "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",
};

const producto3 = {
  title: "Camisa",
  price: 4150,
  thumbnail:
    "https://articulo.mercadolibre.com.ar/MLA-859207549-camisa-lisa-varios-colores-slim-fit-entallada-_JM?searchVariation=57077745991#searchVariation=57077745991&position=2&search_layout=grid&type=item&tracking_id=b025acf3-30d1-4eb1-8ec2-dbc9635ae8bf",
};

async function main() {
  const productos = new Contenedor("./productos.txt");

  //GUARDA OBJETOS Y RETORNA ID
  let id1 = await productos.save(producto1);
  console.log(id1);
  let id2 = await productos.save(producto2);
  console.log(id2);
  let id3 = await productos.save(producto3);
  console.log(id3);

  //BUSCA POR ID 1
  let busca1 = await productos.getById(1);
  console.log(busca1);

  //BUSCA POR ID QUE NO EXISTE
  let busca2 = await productos.getById(5);
  console.log(busca2);

  //DEVUELVE ARRAY CON TODOS LOS OBJETOS
  let all = await productos.getAll();
  console.log(all);

  //BORRA EL ID 2
  await productos.deleteById(2);
  let delete2 = await productos.getAll();
  console.log(delete2);

  //BORRA TODO
  await productos.deleteAll();
  let deleteAll = await productos.getAll();
  console.log(deleteAll);
}

main();
