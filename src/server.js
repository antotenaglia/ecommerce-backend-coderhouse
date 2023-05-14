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
import cluster from "cluster";
import os from "os";
import logger from "./lib/logger.lib.js";
import path from "path";
import { Server as IOServer } from "socket.io";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

const args = yargs(process.argv.slice(2))
  .alias({
      m: "mode",
  })
  .default({
      mode: "FORK",
  }).argv;

const cpus = os.cpus();

if (args.mode.toUpperCase() === "CLUSTER" && cluster.isPrimary) {
    console.log(`CPUS: ${cpus.length} - Primary PID: ${process.pid}`);
      
    cpus.map(() => {
        cluster.fork();
    });

    cluster.on("exit", (worker) => {
        console.log(`Worker ${worker.process.pid} died`);

        cluster.fork();
    });
} else {
    const mongoOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };
    
    app.use(json());
    app.use(urlencoded({ extended: true }));

    app.use("/images", express.static(path.join(__dirname + "/uploads")))
    app.use(express.static(path.join(__dirname + "/public")));

    app.use(
        session({
            secret: config.mongoSecret,
            rolling: true, 
            resave: false,
            saveUninitialized: false,
            store: new MongoStore({
              mongoUrl: config.mongoUrl,
              mongoOptions,
            }),
            cookie: {
              maxAge: Number(config.sessionExpirationTime),
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
    
    app.use(passport.initialize());
    app.use(passport.session());
    
    passport.use("login", passportStrategies.loginStrategy);
    
    passport.serializeUser((user, done) => {
        done(null, user._id);
    });
    
    passport.deserializeUser(async (id, done) => {
        const user = await User.findById(id);
      
        done(null, user);
    });
    
    app.use("/", router);
    
    mongoose.connect(config.mongoUrl);

    const connectedServer = app.listen(config.port || 8080, () => {
        if (config.port) {
          logger.info(`Server listening in port ${config.port}`);
        } else {
          logger.info("Server listening in port 8080");
        };  
    });
    
    connectedServer.on("error", (error) =>
        logger.error(`Server error: ${error}`)
    );

    const io = new IOServer(connectedServer);
    const messages = [];

    io.on("connection", (socket) => {
        socket.emit("server:message", messages);

        socket.on("client:message", (messageInfo) => {
            messages.push(messageInfo);
          
            io.emit("server:message", messages);
        });
    });
};













