import express, { json, urlencoded } from "express";
import router from "./routes/index.js";
import session from "express-session";  
import MongoStore from "connect-mongo";
import { config } from "./config/config.js";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { engine } from "express-handlebars";
import passport from "passport";
import { User } from "./models/user.model.js";
import { passportStrategies } from "./lib/passport.lib.js";
import mongoose from "mongoose";
import yargs from "yargs";

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
    secret: config.mongoSecret,
    rolling: true, //reinicia el tiempo de expiracion de las sesiones con cada request
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
      mongoUrl: config.mongoUrl,
      mongoOptions,
    }),
    cookie: {
      maxAge: 600000, //tiempo de expiración de la sesión - 10 min
    },
  })
);

//se definen vistas en hbs
app.engine('hbs', engine({
  extname: ".hbs",
  defaultLayout: join(__dirname, "../views/layouts/main.hbs"),
  layoutsDir: join(__dirname, "/views/layouts"),
  partialsDir: join(__dirname, "/views")
}));

app.set('view engine', 'hbs');

//se configura passport
app.use(passport.initialize());
app.use(passport.session());

passport.use("login", passportStrategies.loginStrategy);
passport.use("register", passportStrategies.registerStrategy);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);

  done(null, user);
});

//se define que la ruta "/" use routes
app.use("/", router);

//se crea db para los usuarios registrados
mongoose.connect(config.mongoUrl);

//se obtiene puerto de la linea de comandos
const args = yargs(process.argv.slice(2))
  .alias({
    p: "puerto",
  })
  .default({
    puerto: 8080,
  }).argv;

//se crea el servidor
const connectedServer = app.listen(args.puerto, () => {
  console.log(
    `Servidor HTTP escuchando en el puerto ${connectedServer.address().port}`
  );
});
connectedServer.on("error", (error) =>
  console.log(`Error en el servidor: ${error}`)
);








