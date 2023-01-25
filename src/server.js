import express from "express";
import routes from "./routes/index.js";
import { fileURLToPath } from "url";
import { dirname } from "path";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//se define que la ruta "/" use routes
app.use("/", routes)

//se definen archivos estáticos
app.use("/api/productos-test", express.static(__dirname + "/public"));

//se crea el servidor
const connectedServer = app.listen(3000, () => {
  console.log(
    `Servidor HTTP escuchando en el puerto ${connectedServer.address().port}`
  );
});
connectedServer.on("error", (error) =>
  console.log(`Error en el servidor: ${error}`)
);








