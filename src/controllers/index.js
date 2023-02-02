import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const serverLogin = (req, res) => {
    res.sendFile(join(__dirname, "../../views/login.html"));
};

const login = (req, res) => {
    const  { loginName } = req.body;
    
    req.session.user = loginName;
  
    res.redirect("/welcome");
};

const logout = (req, res) => {
    const loginName = req.session.user;

    req.session.destroy();
  
    res.render("logout", { loginName });
  };

const serverWelcome = (req, res) => {
    const loginName = req.session.user;

    if (loginName) {
      res.render("welcome", { loginName });
    } else {
      res.redirect("/login");
    }
};

export const controller = {
    serverLogin,
    serverWelcome,
    login,
    logout,
};