import { dirname, join } from "path";
import { fileURLToPath } from "url";
import logger from "../lib/logger.lib.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getIndex = (ctx) => {
    // const { originalUrl, method } = req;
  
    // if (originalUrl && method) {
    //   logger.info(`Route ${method} ${originalUrl} implemented`);
    //   res.sendFile(join(__dirname, "../../views/index.html"));
    // };

    if (ctx.method && ctx.originalUrl) {
        logger.info(`Route ${ctx.method} ${ctx.originalUrl} implemented`);
        
        ctx.html("index.html");      
  };
};

export const indexController = {
    getIndex
};
