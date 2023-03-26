import { dirname, join } from "path";
import { fileURLToPath } from "url";
import logger from "../lib/logger.lib.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getIndex = (req, res) => {
    const { url, method } = req;
  
    if (url && method) {
      logger.info(`Route ${method} ${url} implemented`);
      res.sendFile(join(__dirname, "../../views/index.html"));
    };
  };


export const indexController = {
    getIndex
};
