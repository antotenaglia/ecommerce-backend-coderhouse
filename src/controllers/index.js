import { dirname, join } from "path";
import { fileURLToPath } from "url";
import yargs from "yargs";
import util from "util";
import { fork } from "child_process";
import os from "os";
import { logger } from "../lib/logger.lib.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const serverLogin = (req, res) => {
  const { url, method } = req;

  if (url && method) {
    logger.infoLogger.info(`Ruta ${method} ${url} implementada`)
    if (req.isAuthenticated()) {
      const user = req.user; 

      return res.render("welcome", { username: user.username });
    }
    res.sendFile(join(__dirname, "../../views/login.html"));
  }
};

const getRegister = (req, res) => {
  const { url, method } = req;

  if (url && method) {
    logger.infoLogger.info(`Ruta ${method} ${url} implementada`);
    res.sendFile(join(__dirname, "../../views/register.html"));
  }
};

const postRegister = (req, res) => {
  const { url, method } = req;

  if (url && method) {
    logger.infoLogger.info(`Ruta ${method} ${url} implementada`)
    const user = req.user;
    
    if (user) {
      return res.render("welcome", { username: user.username });
    } 

    return res.render("registerError");
  }
};

const loginFailure = (req, res) => {
  const { url, method } = req;

  if (url && method) {
    logger.infoLogger.info(`Ruta ${method} ${url} implementada`)
    res.render("loginError");
  }
};

const registerFailure = (req, res) => {
  const { url, method } = req;

  if (url && method) {
    logger.infoLogger.info(`Ruta ${method} ${url} implementada`)
    res.render("registerError");
  }
};

const logout = (req, res) => {
  const user = req.user;
  const { url, method } = req;

  if (url && method) {
    logger.infoLogger.info(`Ruta ${method} ${url} implementada`)
    req.session.destroy((err) => {
      if (err) {
        res.json(err);
        logger.errorLogger.error(err);
      } else {
        return res.render("logout", { username: user.username });
      }
    });   
  }
};

const infoNoDebug = (req, res) => {
  const entry = JSON.stringify(yargs(process.argv.slice(2)).argv);
  const path = process.execPath; 
  const osName = process.platform;
  const idprocess = process.pid;
  const version = process.version;
  const projectFolder = process.cwd();
  const rss = util.inspect(process.memoryUsage(), {
    showHidden: false,
    depth: null,
  });
  const numCPUs = os.cpus().length;
  const response = "Hola que tal".repeat(1000);
  const { url, method } = req;

  if (url && method) {
    logger.infoLogger.info(`Ruta ${method} ${url} implementada`);
    return res.render("info", { 
      entry: entry, 
      path: path, 
      osName: osName, 
      idprocess: idprocess, 
      version: version, 
      projectFolder: projectFolder, 
      rss: rss, 
      numCPUs: numCPUs,
      response: response,
    });
  } 
};

const infoDebug = (req, res) => {
  const entry = JSON.stringify(yargs(process.argv.slice(2)).argv);
  const path = process.execPath; 
  const osName = process.platform;
  const idprocess = process.pid;
  const version = process.version;
  const projectFolder = process.cwd();
  const rss = util.inspect(process.memoryUsage(), {
    showHidden: false,
    depth: null,
  });
  const numCPUs = os.cpus().length;
  const longResponseProof = "Hola que tal".repeat(1000);
  const { url, method } = req;

  if (url && method) {
    logger.infoLogger.info(`Ruta ${method} ${url} implementada`);
    logger.infoLogger.info(longResponseProof)
    return res.render("info", { 
      entry: entry, 
      path: path, 
      osName: osName, 
      idprocess: idprocess, 
      version: version, 
      projectFolder: projectFolder, 
      rss: rss, 
      numCPUs: numCPUs,
      longResponseProof: longResponseProof,
    });
  } 
};

const randoms = (req, res) => {
  const { cant } = req.query;
  const child = fork(join(__dirname, "../child.js")) 
  const quantity = cant ? cant : 100000000;
  const { url, method } = req;

  if (url && method) {
    logger.infoLogger.info(`Ruta ${method} ${url} implementada`)
    child.send(quantity);

    child.on("message", (response) => {
      return res.render("random", { random: JSON.stringify(response) });
    })
  }
};

const warn = (req, res) => {
  const { url, method } = req;

  logger.warnLogger.warn(`Ruta ${method} ${url} no implementada`);
  res.send(`Ruta ${method} ${url} no está implementada`);
}

export const controller = {
    serverLogin,
    getRegister,
    postRegister,
    loginFailure,
    registerFailure,
    logout,
    infoDebug,
    infoNoDebug,
    randoms,
    warn,
};


