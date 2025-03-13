import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;


const userSchema = new Schema({
    email : {type: String, required: true, unique: true},                             // one email one account
    name : {type: String},
    avatar: {type: Buffer}
});

// each chatroom will contain participant ids
const chatroomSchema = new Schema({
    participant_ids : {type: String},                   // comma separeted string of hex `ObjectId`s
    last_message : {type: ObjectId},
    avatar: {type: Buffer}
});


// each message will store sender and chatroom ids
const messageSchema = new Schema({
    sender_id : ObjectId,
    chatroom_id : ObjectId,
    message : {type: String},
    time: {type: Date},
    seen_status: {type: Number}
});




export const userModel = mongoose.model("User", userSchema);
export const chatroomModel = mongoose.model("Chatroom", chatroomSchema);
export const messageModel = mongoose.model("Message", messageSchema);

