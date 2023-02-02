import express, { json, urlencoded } from "express";
import router from "./routes/index.js";
import session from "express-session";  
import MongoStore from "connect-mongo";
import { config } from "./config/config.js";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { engine } from "express-handlebars";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

app.use(json());
app.use(urlencoded({ extended: true }));

//se persisten las sesiones en mongo Atlas
app.use(
  session({
    secret: "coderhouse",
    rolling: true, //reinicia el tiempo de expiracion de las sesiones con cada request
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
      mongoUrl: config.mongoUrl,
      mongoOptions,
    }),
    cookie: {
      maxAge: 60000, //tiempo de expiración de la sesión
    },
  })
);

app.engine('hbs', engine({
  extname: ".hbs",
  defaultLayout: join(__dirname, "../views/layouts/main.hbs"),
  layoutsDir: join(__dirname, "/views/layouts"),
  partialsDir: join(__dirname, "/views")
}));

app.set('view engine', 'hbs');


//se define que la ruta "/" use routes
app.use("/", router)

//se crea el servidor
const connectedServer = app.listen(3000, () => {
  console.log(
    `Servidor HTTP escuchando en el puerto ${connectedServer.address().port}`
  );
});
connectedServer.on("error", (error) =>
  console.log(`Error en el servidor: ${error}`)
);








