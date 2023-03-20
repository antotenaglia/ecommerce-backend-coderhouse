import { dirname, join } from "path";
import { fileURLToPath } from "url";
import yargs from "yargs";
import util from "util";
import { fork } from "child_process";
import os from "os";
import logger from "../lib/logger.lib.js";
import { User } from "../models/user.model.js";
import { Cart } from "../models/cart.model.js";
import bcrypt from "bcrypt";
import { sendMail } from "../nodemailer.js";
import productsContainer from "../container/products.container.js";
import cartsContainer from "../container/cart.container.js";
import * as fs from 'fs';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const hashPassword = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

const getIndex = (req, res) => {
  const { url, method } = req;

  if (url && method) {
    logger.info(`Ruta ${method} ${url} implementada`);
    res.sendFile(join(__dirname, "../../views/index.html"));
  };
};

const getLogin = (req, res) => {
  const { url, method } = req;

  if (url && method) {
    logger.info(`Ruta ${method} ${url} implementada`)
    
    if (req.isAuthenticated()) {
      const user = req.user; 

      return res.render("home", 
        {
          username: user.username,
          firstname: user.firstname,
          lastname: user.lastname,
          address: user.address,
          age: user.age,
          phone: user.phone,
          photo: user.photo,
        }
      );
    }

    res.sendFile(join(__dirname, "../../views/login.html"));
  }
};

const getRegister = (req, res) => {
  const { url, method } = req;

  if (url && method) {
    logger.info(`Ruta ${method} ${url} implementada`);
    res.sendFile(join(__dirname, "../../views/register.html"));
  };
};

const postRegister = async (req, res) => {

  try {
    const existingUser = await User.findOne({ username: req.body.username });

    if (existingUser) {
      return res.render("registerError");
    } 

    const newUser = {
      username: req.body.username,
      password: hashPassword(req.body.password),
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      address: req.body.address,
      age: req.body.age,
      phone: req.body.phone,
      photo: `http://localhost:3000/images/${req.file.filename}`,
    };

    const createdUser = await User.create(newUser);
    
    sendMail.sendMailNewRegister(createdUser);

    //const cart = {username: newUser.username, products: []};

    //await fs.promises.writeFile('carts.txt', JSON.stringify(cart, null, 2));
    
    return res.render("home", createdUser);
  
  } catch (err) {
    logger.error(err);
    return res.json("error while register", err);
  }
};

const getLoginFailure = (req, res) => {
  const { url, method } = req;

  if (url && method) {
    logger.info(`Ruta ${method} ${url} implementada`)
    res.render("loginError");
  }
};

const getRegisterFailure = (req, res) => {
  const { url, method } = req;

  if (url && method) {
    logger.info(`Ruta ${method} ${url} implementada`)
    res.render("registerError");
  }
};

const getProducts = async (req, res) => {
  const { url, method } = req;
  const username = req.query.username;
  const products = new productsContainer(join(__dirname, "../../products.txt")); 
  let productsList = await products.getAllProducts();
  
  productsList.forEach(element => {
    element.username = username;
  });
  
  if (url && method) {
      logger.info(`Ruta ${method} ${url} implementada`);
      
      return res.render("products", {productsList});
  }
};

const getCart = async (req, res) => {
  const { url, method } = req;
  const cart = new cartsContainer(join(__dirname, "../../carts.txt")); 
  let cartList = await cart.getCart(); 

  if (url && method) {
      logger.info(`Ruta ${method} ${url} implementada`);
      if (cartList.products.length) {
        return res.render("cart", {cartList});
      } else {
        return res.render("cartError");
      }    
  }
};

const postCart = async (req, res) => {
  try {

    const newProduct = {
      title: req.body.title,
      price: req.body.price,
      thumbnail: req.body.thumbnail
    };

    const existingCart = await Cart.findOne({ username: req.body.username });

    if (existingCart) {

      existingCart.products.push(newProduct);

      await Cart.findByIdAndUpdate(existingCart._id, {products: existingCart.products});
     
    } else {

      const newCart ={
        username: req.body.username,
        products: []
      }

      newCart.products.push(newProduct);

      await Cart.create(newCart);

    }

    const products = new productsContainer(join(__dirname, "../../products.txt")); 
      
    let productsList = await products.getAllProducts();

    res.render("products", {productsList});
  
  } catch (err) {
    logger.error(err);
    res.sendStatus(500);
  }
};

const getCartPurchase = async (req, res) => {
  const cart = new cartsContainer(join(__dirname, "../../carts.txt"));
  const { url, method } = req;

  if (url && method) {
      logger.info(`Ruta ${method} ${url} implementada`);
      
      if (cart.products.length) {
        sendMail.sendMailNewOrder(cart);

        return res.render("cartPurchase");
      } else {
        return res.render("cartError");
      }
  }
};

const getLogout = (req, res) => {
  const user = req.user;
  const { url, method } = req;

  if (url && method) {
    logger.info(`Ruta ${method} ${url} implementada`)
    req.session.destroy((err) => {
      if (err) {
        res.json(err);
        logger.error(err);
      } else {
        return res.render("logout", { username: user.username });
      }
    });   
  }
};

const getInfoNoDebug = (req, res) => {
  const infoNoDebug = {
    entry : JSON.stringify(yargs(process.argv.slice(2)).argv),
    path : process.execPath,
    osName : process.platform,
    idprocess : process.pid,
    version : process.version,
    projectFolder : process.cwd(),
    rss : util.inspect(process.memoryUsage(), {
      showHidden: false,
      depth: null,
    }),
    numCPUs : os.cpus().length
  };
  const { url, method } = req;

  if (url && method) {
    logger.info(`Ruta ${method} ${url} implementada`);
    return res.render("info-nodebug", { infoNoDebug: infoNoDebug });
  } 
};

const getRandoms = (req, res) => {
  const { cant } = req.query;
  const child = fork(join(__dirname, "../child.js")) 
  const quantity = cant ? cant : 100000000;
  const { url, method } = req;

  if (url && method) {
    logger.info(`Ruta ${method} ${url} implementada`)
    child.send(quantity);

    child.on("message", (response) => {
      return res.render("random", { random: JSON.stringify(response) });
    })
  }
};

const getWarn = (req, res) => {
  const { url, method } = req;

  logger.warn(`Ruta ${method} ${url} no implementada`);
  res.send(`Ruta ${method} ${url} no está implementada`);
}

export const controller = {
    getIndex,  
    getLogin,
    getRegister,
    postRegister,
    getLoginFailure,
    getRegisterFailure,
    getProducts,
    getCart,
    postCart,
    getCartPurchase,
    getLogout,
    getInfoNoDebug,
    getRandoms,
    getWarn,
};


