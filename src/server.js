import express, { json, urlencoded } from "express";
import routes from "./routes/index.js";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { engine } from "express-handlebars";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//traducen información del req.body en formato JS
app.use(json())
app.use(urlencoded({ extended: true }))

//se define que la ruta "/" use routes
app.use("/", routes)

//se configura motor de plantillas hbs
app.engine('hbs', engine({
  extname: ".hbs",
  defaultLayout: join(__dirname, "/views/layouts/main.hbs"),
  layoutsDir: join(__dirname, "/views/layouts"),
  partialsDir: join(__dirname, "/views/partials")
}))

//se establece motor de plantillas ejs
app.set("view engine", "hbs");

//se establece carpeta donde se encuentran plantillas
app.set("views", __dirname + '/views')

//se crea el servidor
const connectedServer = app.listen(3000, () => {
  console.log(
    `Servidor HTTP escuchando en el puerto ${connectedServer.address().port}`
  );
});
connectedServer.on("error", (error) =>
  console.log(`Error en el servidor: ${error}`)
);

