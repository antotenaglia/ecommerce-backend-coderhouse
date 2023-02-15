import { dirname, join } from "path";
import { fileURLToPath } from "url";
import yargs from "yargs";
import util from "util";
import { fork } from "child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const serverLogin = (req, res) => {
  if (req.isAuthenticated()) {
    const user = req.user; 

    return res.render("welcome", { username: user.username });
  }
  res.sendFile(join(__dirname, "../../views/login.html"));
};

const getRegister = (req, res) => {
  res.sendFile(join(__dirname, "../../views/register.html"));
};

const postRegister = (req, res) => {

  const user = req.user;
  
  if (user) {
    return res.render("welcome", { username: user.username });
  } 

  return res.render("registerError");
};

const loginFailure = (req, res) => {
  res.render("loginError");
};

const registerFailure = (req, res) => {
  res.render("registerError");
};

const logout = (req, res) => {
  const user = req.user;

  req.session.destroy((err) => {
    if (err) {
      res.json(err);
    } else {
      return res.render("logout", { username: user.username });
    }
  });   
};

const info = (req, res) => {
  const entry = JSON.stringify(yargs(process.argv.slice(2)).argv);
  const path = process.execPath; 
  const os = process.platform;
  const idprocess = process.pid;
  const version = process.version;
  const projectFolder = process.cwd();
  const rss = util.inspect(process.memoryUsage(), {
    showHidden: false,
    depth: null,
  });

  return res.render("info", { 
    entry: entry, 
    path: path, 
    os: os, 
    idprocess: idprocess, 
    version: version, 
    projectFolder: projectFolder, 
    rss: rss 
  });
};

const randoms = (req, res) => {
  const { cant } = req.query;
  const child = fork(join(__dirname, "../child.js")) 
  const quantity = cant ? cant : 100000000;

  child.send(quantity);

  child.on("message", (response) => {
    return res.render("random", { random: JSON.stringify(response) });
  })
};

export const controller = {
    serverLogin,
    getRegister,
    postRegister,
    loginFailure,
    registerFailure,
    logout,
    info,
    randoms,
};


