import express, { json, urlencoded } from "express";
import productsRouter from "./routes/products.route.js";
import baseRouter from "./routes/base.route.js";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//traducen información del req.body en formato JS
app.use(json())
app.use(urlencoded({ extended: true }))

//se accede a archivos estáticos a través de la carpeta uploads
app.use("/images", express.static(path.join(__dirname + "/uploads")))

//se define que la ruta "/api/products" use productsRouter
app.use("/api/products", productsRouter)
//se define que la ruta "/" use baseRouter
app.use("/", baseRouter)

//se crea el servidor
const connectedServer = app.listen(8080, () => {
  console.log(
    `Servidor HTTP escuchando en el puerto ${connectedServer.address().port}`
  );
});
connectedServer.on("error", (error) =>
  console.log(`Error en el servidor: ${error}`)
);

