import { Messages } from "../models/messages.model.js";
import logger from "../lib/logger.lib.js";

const createMessages = async (username, type, ListOfMessages) => {
  try {
      let newMessage = {};
      newMessage.username = username;
      newMessage.type = type;
      newMessage.messages = [];
      newMessage.messages.push(ListOfMessages);
      const messages = await Messages.create(newMessage);
      
      return messages;
    } catch (err) {
      logger.error(`Error creating messages: ${err}`);
    }  
};

const findMessages = async (username) => {
    try {
        const messages = await Messages.findOne({ username: username });
    
        return messages;
      } catch (err) {
        logger.error(`Error finding messages: ${err}`);
      }  
};

const findAllMessages = async () => {
  try {
      const messages = await Messages.find().lean();
  
      return messages;
    } catch (err) {
      logger.error(`Error finding all messages: ${err}`);
    }  
};

const updateMessages = async (username, newMessage) => {
  try {
      const userMessages = await Messages.findOne({ username: username });
      
      userMessages.messages.push(newMessage);
        
      const updatedMessages = await Messages.findByIdAndUpdate(userMessages._id, {messages: userMessages.messages});
  
      return updatedMessages;
    } catch (err) {
      logger.error(`Error updating messages: ${err}`);
    }  
};

export const messagesDao = {
    createMessages,
    findMessages,
    findAllMessages,
    updateMessages,
};