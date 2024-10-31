import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;


const user = new Schema({
    email : {type: String, unique: true},
    userName : {type: String, unique: true},
    name : {type: String},
    password : {type: String}
});

/*
    // chats are stored in this format in database:

    <timestamp sender content>
    <timestamp sender content>
    <timestamp sender content>
    <timestamp sender content>
    <timestamp sender content>
    <timestamp sender content>

*/
const chat = new Schema({
    user1 : {type: ObjectId},
    user2 : {type: ObjectId},
    messages : {type: String}
});




export const userModel = mongoose.model("users", user);
export const chatModel = mongoose.model("chats", chat);

