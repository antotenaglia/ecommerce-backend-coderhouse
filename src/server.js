import express from "express";
import productsRouter from "./routes/products.route";
import cartRouter from "./routes/cart.route";

const app = express();

//traducen información del req.body en formato JS
app.use(json())
app.use(urlencoded({ extended: true }))

//se definen las rutas 
app.use("/api/products", productsRouter)
app.use("/api/cart", cartRouter)

//se crea el servidor
const connectedServer = app.listen(8080, () => {
  console.log(
    `Servidor HTTP escuchando en el puerto ${connectedServer.address().port}`
  );
});
connectedServer.on("error", (error) =>
  console.log(`Error en el servidor: ${error}`)
);







