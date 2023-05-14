import dotenv from "dotenv";

dotenv.config();

export const config = {
    nodeEnv: process.env.NODE_ENV,
    mongoUrl: "",
    mongoSecret: process.env.MONGO_SECRET,
    sessionExpirationTime: process.env.MONGO_SESSION_TIME,
    etherealMail: process.env.MAIL_ETHEREAL,
    etherealPassword: process.env.PASSWORD_ETHEREAL,
    port: process.env.PORT,
};