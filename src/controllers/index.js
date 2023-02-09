import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const serverLogin = (req, res) => {
  if (req.isAuthenticated()) {
    const user = req.user; 

    return res.render("welcome", { email: user.email });
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

// const serverWelcome = (req, res) => {
//   const email = req.session.user;

//   if (email) {
//     res.render("welcome", { email });
//   } else {
//     res.redirect("/login");
//   }
// };

const loginFailure = (req, res) => {
  res.render("loginError");
};

const registerFailure = (req, res) => {
  res.render("registerError");
};

// const login = (req, res) => {
//   const  { email } = req.body;
  
//   if (!users.includes(email)) {
//     return res.render("loginError");
//   }

//   req.session.user = email;

//   res.redirect("/welcome");
// };

// const register = (req, res) => {
//     const  { email } = req.body;
  
//     if (users.includes(email)) {
//       return res.render("registerError");
//     }
  
//     users.push(email);

//     res.redirect("/login");
// };

const logout = (req, res) => {
    const user = req.user;
    //req.session.destroy(); //va????
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