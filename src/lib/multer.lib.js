import multer from "multer";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    },
    destination: (req, file, cb) => {
        const destination = path.join(__dirname, "../uploads");
        
        cb(null, destination);    
    },
});

const uploadFileMiddleware = multer({ storage });

export default uploadFileMiddleware;


