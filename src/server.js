import express from "express";
import routes from "./routes/index.js";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { engine } from "express-handlebars";
import { Server as IOServer } from "socket.io";
import * as fs from 'fs';

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
const products = [];
const messages = [];

//se indica dónde se encuentran los archivos estáticos
app.use(express.static(__dirname + "/public"));

//se ejecuta el evento de socket io cuando se conecta un cliente
io.on("connection", (socket) => {
  //se muestra el id del socket que se conectó
  console.log(`New connection, socket ID: ${socket.id}`);

  //para nuevos clientes, se actualizan todos los productos y mensajes escritos hasta el momento 
  socket.emit("server:product", products);
  socket.emit("server:message", messages);

  //se escucha el evento "product" que viene del cliente  
  socket.on("client:product", (productInfo) => {
    //se actualiza el arreglo de productos
    products.push(productInfo);

    //se muestra a TODOS los sockets conectados el arreglo de productos actualizado
    io.emit("server:product", products);
  });

  //se escucha el evento "message" que viene del cliente  
  socket.on("client:message", (messageInfo) => {
    //se actualiza el arreglo de mensajes
    messages.push(messageInfo);

    //se guardan los mensajes en 'messages.txt'
    async function saveMessages() {
      try {
        await fs.promises.writeFile('./messages.txt', JSON.stringify(messages, null, 2));
      } catch (error) {
        throw new Error(`Error al guardar producto en el archivo: ${error}`);
      }
    };

    saveMessages();

    //se muestra a TODOS los sockets conectados el arreglo de mensajes actualizado
    io.emit("server:message", messages);
  });
});





