import express, { json, urlencoded } from "express";
import productsRouter from "./routes/products.route.js";
import cartRouter from "./routes/cart.route.js";

const app = express();

//traducen información del req.body en formato JS
app.use(json())
app.use(urlencoded({ extended: true }))

//se definen las rutas 
app.use("/api/products", productsRouter)
app.use("/api/cart", cartRouter)

//se define error por métodos no implementados
app.use(function(req, res) {
  let obj = {error: -2};

  if (req.method === "DELETE") {
      obj.description = "DELETE method not supported";
  } else if (req.method === "PUT") {
      obj.description = "PUT method not supported";
  } else if (req.method === "GET") {
    obj.description = "GET method not supported";
  } else if (req.method === "POST") {
    obj.description = "POST method not supported";
  } else {
    obj.description = "Invalid method";
  }

  res.status(404).json(obj);
});

//se crea el servidor
const connectedServer = app.listen(8080, () => {
  console.log(
    `Servidor HTTP escuchando en el puerto ${connectedServer.address().port}`
  );
});
connectedServer.on("error", (error) =>
  console.log(`Error en el servidor: ${error}`)
);







