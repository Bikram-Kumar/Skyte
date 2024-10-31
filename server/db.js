import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;


const user = new Schema({
    email : {type: String, unique: true},
    userName : {type: String, unique: true},
    name : {type: String},
    password : {type: String}
});


export const userModel = mongoose.model("users", user);

