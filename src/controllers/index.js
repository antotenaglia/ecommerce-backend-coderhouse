import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const serverLogin = (req, res) => {
  if (req.isAuthenticated()) {
    const user = req.session.user; //req.session.user??? él puso req.user
    return res.render("welcome", { email: user.email });
  } else {    //esto va??
    res.redirect("/login");
  }

  res.sendFile(join(__dirname, "../../views/login.html"));
};

const serverRegister = (req, res) => {
  if (req.isAuthenticated()) {
    const user = req.session.user;

    return res.redirect("/login");
  }

  res.sendFile(join(__dirname, "../../views/register.html"));
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
    const user = req.session.user;

    req.session.destroy(); //va????

    req.logout(() => {
      return res.render("logout", { email: user.email });
    });
};

export const controller = {
    serverLogin,
    serverRegister,
    loginFailure,
    registerFailure,
    logout,
};