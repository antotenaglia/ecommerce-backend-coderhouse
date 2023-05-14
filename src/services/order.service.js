import { orderDao } from "../daos/index.js";
import logger from "../lib/logger.lib.js";


const createOrder = async (username) => {
    try {
      const order = await orderDao.createOrder(username);
  
      return order;
    } catch (err) {
        logger.error(`Error creating Order: ${err}`);
    };
};

const findOrder = async (username) => {
    try {
      const order = await orderDao.findOrder(username);
  
      return order;
    } catch (err) {
        logger.error(`Error finding Order: ${err}`);
    };
};

const findAllOrders = async () => {
    try {
      const order = await orderDao.findAllOrders();

      return order;
    } catch (err) {
        logger.error(`Error finding all Orders: ${err}`);
    };
};

export const orderService = {
    createOrder,
    findOrder,
    findAllOrders,
};