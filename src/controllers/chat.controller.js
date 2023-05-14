import logger from "../lib/logger.lib.js";
import { messagesService } from "../services/messages.service.js";

const getChat = async (req, res) => {
    try {
        const username = req.query.username;
        const { originalUrl, method } = req;
      
        if (originalUrl && method) {
            logger.info(`Route ${method} ${originalUrl} implemented`);
    
            res.render("chatRoom", {username})
        };
    } catch (err) {
        logger.error(`Error getting Chat: ${err}`);
    };
};

const getChatSummary = async (req, res) => {
    try {
        const username = req.query.username;
        const { originalUrl, method } = req;
        const allMessages = await messagesService.findAllMessages();
      
        if (originalUrl && method) {
            logger.info(`Route ${method} ${originalUrl} implemented`);
            
            if (username === "admin@admin.com") {
                let messagesList = [];

                allMessages.filter(x => x.type === 'client').forEach(x => {
                    messagesList.push({admin: username, username: x.username, messages: x.messages});
                });
                
                res.render("chatRoomForAdmin", {username, messagesList})
            } else {
                res.render("noPermission")
            };    
        };
    } catch (err) {
        logger.error(`Error getting Chat Summary: ${err}`);
    };
};

const postChat = async (req, res) => {  
    try {
        const { originalUrl, method } = req;
        const username = req.query.username;
        const message = req.body.message;
        const dateAndTime = new Date().toLocaleString();
        
        if (originalUrl && method) {
            logger.info(`Route ${method} ${originalUrl} implemented`);

            let type;
    
            if (username === "admin@admin.com") {
                type = "server";
            } else {
                type = "client";
            };

            const newMessage = {dateAndTime: dateAndTime, newMessage: message};
            const findMessagesByUser = await messagesService.findMessages(username);
           
            if (findMessagesByUser) {
                await messagesService.updateMessages(username, newMessage);
            } else {
                await messagesService.createMessages(username, type, newMessage);
            };
    
            return res.sendStatus(200);
        }
    } catch (err) {
        logger.error(`Error posting Chat: ${err}`);
    };
};

const getChatByUsername = async (req, res) => {
    try {
        const username = req.query.username;
        const { originalUrl, method } = req;

        if (originalUrl && method) {
            logger.info(`Route ${method} ${originalUrl} implemented`);

            const findMessagesByUser = await messagesService.findMessages(username);

            res.render("chatByUsername", {findMessagesByUser, username});
        };
    } catch (err) {
      logger.error(`Error getting Chat by Username: ${err}`);
    };
};

export const chatController = {
    getChat,
    getChatSummary,
    postChat,
    getChatByUsername,
};