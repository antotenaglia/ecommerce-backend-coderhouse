import { model, Schema } from "mongoose";

const messagesSchema = new Schema({
    username: String,
    type: String,
    messages: Array,
 });

export const Messages = model("Messages", messagesSchema);

