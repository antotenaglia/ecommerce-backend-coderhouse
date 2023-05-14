import { Order } from "../models/order.model.js";
import logger from "../lib/logger.lib.js";

const createOrder = async (newOrder) => {
    try {
        const order = await Order.create(newOrder);
        
        return order;
      } catch (err) {
        logger.error(`Error creating Order: ${err}`);
      };  
};

const findOrder = async (username) => {
    try {
        const order = await Order.findOne({ username: username });
    
        return order;
      } catch (err) {
        logger.error(`Error finding Order: ${err}`);
      };  
};

const findAllOrders = async () => {
  try {
      const order = await Order.find().lean();
  
      return order;
    } catch (err) {
      logger.error(`Error finding All Orders: ${err}`);
    };  
};

export const orderDao = {
    createOrder,
    findOrder,
    findAllOrders,
};