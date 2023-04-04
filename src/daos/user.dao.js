import { User } from "../models/user.model.js";
import logger from "../lib/logger.lib.js";

const createUser = async (newUser) => {
    try {
        const user = await User.create(newUser);

        return user;
      } catch (err) {
        logger.error(`Error creating user: ${err}`);
      }  
};

const findUser = async (username) => {
    try {
        const user = await User.findOne({ username: username });
    
        return user;
      } catch (err) {
        logger.error(`Error finding user: ${err}`);
      }  
};

export const userDao = {
    createUser,
    findUser
}