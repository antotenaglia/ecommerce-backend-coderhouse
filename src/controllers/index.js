import { dirname, join } from "path";
import { fileURLToPath } from "url";

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
    //req.session.destroy(); //va????
    req.logout();
    return res.render("logout", { username: user.username });
};

export const controller = {
    serverLogin,
    getRegister,
    postRegister,
    loginFailure,
    registerFailure,
    logout,
};