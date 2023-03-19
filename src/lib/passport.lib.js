import bcrypt from "bcrypt";
import LocalStrategy from "passport-local";
import { User } from "../models/user.model.js";
import logger from "./logger.lib.js";

const validatePassword = (plainPassword, hashedPassword) => {
  return bcrypt.compareSync(plainPassword, hashedPassword);
};

const loginStrategy = new LocalStrategy(async (username, password, done) => {
    try {
        const user = await User.findOne({ username: username });

        if (!user || !validatePassword(password, user.password)) {
        return done(null, null);   
        }

        done(null, user);
    } catch (err) {
        logger.error(err);
        done("Error while login in", null);
    }
});

export const passportStrategies = { loginStrategy };