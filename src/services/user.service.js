import { userDao } from "../daos/index.js";
import logger from "../lib/logger.lib.js";

const createUser = async (username) => {
    try {
      const user = await userDao.createUser(username);
  
      return user;
    } catch (err) {
        logger.error(`Error creating user: ${err}`);
    };
};

const findUser = async (username) => {
    try {
      const user = await userDao.findUser(username);
  
      return user;
    } catch (err) {
        logger.error(`Error finding user: ${err}`);
    };
};

export const userService = {
    createUser,
    findUser
};