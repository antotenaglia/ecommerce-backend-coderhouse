import { messagesDao } from "../daos/index.js";
import logger from "../lib/logger.lib.js";

const createMessages = async (username, type, listOfMessages) => {
    try {
      const messages = await messagesDao.createMessages(username, type, listOfMessages);

      return messages;
    } catch (err) {
        logger.error(`Error creating messages: ${err}`);
    };
};

const findMessages = async (username) => {
    try {
      const messages = await messagesDao.findMessages(username);
  
      return messages;
    } catch (err) {
        logger.error(`Error finding messages: ${err}`);
    };
};

const findAllMessages = async () => {
    try {
      const messages = await messagesDao.findAllMessages();
  
      return messages;
    } catch (err) {
        logger.error(`Error finding all messages: ${err}`);
    };
};

const updateMessages = async (username, newMessage) => {
    try {
      const messages = await messagesDao.updateMessages(username, newMessage);

      return messages;
    } catch (err) {
        logger.error(`Error updating messages: ${err}`);
    };
};

export const messagesService = {
    createMessages,
    findAllMessages,
    findMessages,
    updateMessages,
};