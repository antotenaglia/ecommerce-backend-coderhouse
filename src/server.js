import express from "express";
import routes from "./routes/index.js";
import { fileURLToPath } from "url";
import path, { dirname, join } from "path";
import { engine } from "express-handlebars";
import { Server as IOServer } from "socket.io";
import Contenedor from "./api.js";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//se define que la ruta "/" use routes
app.use("/", routes)

//se configura motor de plantillas hbs
app.engine('hbs', engine({
  extname: ".hbs",
  defaultLayout: join(__dirname, "/public/index.html"),
  layoutsDir: join(__dirname, "/public"),
  partialsDir: join(__dirname, "/views/partials")
}))

//se establece motor de plantillas hbs
app.set("view engine", "hbs");

//se establece carpeta donde se encuentran plantillas hbs
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

//se establece como server a websocket
const io = new IOServer(connectedServer);

//se configuran productos con base de datos MariaDB
const productApi = new Contenedor(
  {
    client: "mysql",
    connection: { 
      host: "127.0.0.1",
      user: "root",
      database: "coderhouse",
    },
    pool: { min: 0, max: 7},
  }, "product"
);

//se configuran mensajes con base de datos SQLite3 
const messageApi = new Contenedor(
  {
    client: "sqlite3",
    connection: { 
      filename: path.resolve(__dirname, "./database/coderhouse.sqlite")
    },
    useNullAsDefault: true,
  }, "message"
)

//se indica dónde se encuentran los archivos estáticos
app.use(express.static(__dirname + "/public"));

//se ejecuta el evento de socket io cuando se conecta un cliente
io.on("connection", async (socket) => {
  //se muestra el id del socket que se conectó
  console.log(`New connection, socket ID: ${socket.id}`);

  //para nuevos clientes, se actualizan todos los productos y mensajes escritos hasta el momento 
  socket.emit("server:product", await productApi.getAll());
  socket.emit("server:message", await messageApi.getAll());

  //se escucha el evento "product" que viene del cliente  
  socket.on("client:product", async (productInfo) => {
    //se actualiza el arreglo de productos
    await productApi.save({
      title: productInfo.productName, 
      price: productInfo.productPrice, 
      thumbnail: productInfo.productThumbnail
    });

    //se muestra a TODOS los sockets conectados el arreglo de productos actualizado
    io.emit("server:product", await productApi.getAll());
  });

  //se escucha el evento "message" que viene del cliente  
  socket.on("client:message", async (messageInfo) => {
    //se actualiza el arreglo de mensajes
    await messageApi.save({...messageInfo, fyh: Date.now()});

    //se muestra a TODOS los sockets conectados el arreglo de mensajes actualizado
    io.emit("server:message", await messageApi.getAll());
  });
});







