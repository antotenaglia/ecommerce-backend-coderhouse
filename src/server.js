import express, {json} from "express";
import routes from "./routes/index.js";
import { db } from "./db/db.js";
import { config } from "./config/config.js";

const app = express();
app.use(json());

//se definen las rutas 
app.use("/", routes);

//se crea el servidor y se conecta a base de datos - puede ser mongo o firebase
db.connectDb(config.dbUrl).then(() => {
  console.log("Database connected");
  app.listen(3000, () => {
    console.log("Server listening in port 3000");
  });
});
