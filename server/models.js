import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;


const userSchema = new Schema({
    email : {type: String, required: true, unique: true},                             // one email one account
    name : {type: String},
    avatar: {type: String}
});


const chatroomSchema = new Schema({
    emails : {type: String, required: true},   // comma separeted string of emails
    last_message : {type: ObjectId},           // reference to `message`
    is_dm: {type: Boolean, required: true},    // is direct message or group chat?
    avatar: {type: String}                     // for groups
});


// each message will store sender and chatroom ids
const messageSchema = new Schema({
    sender : {type: String, required: true},
    chatroom_id : {type: ObjectId, required: true},
    message : {type: String, required: true},
    time: {type: Date, required: true},
    seen_status: {type: Number}
});




export const userModel = mongoose.model("User", userSchema);
export const chatroomModel = mongoose.model("Chatroom", chatroomSchema);
export const messageModel = mongoose.model("Message", messageSchema);

