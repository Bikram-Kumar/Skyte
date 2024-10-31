import {userModel} from "../db.js";




export async function signUp(req, res) {
    const {email, userName, name, password} = req.body;

    try {
        await userModel.create({email, userName, name, password});
        res.send("User created");
        console.log("Something went wrong");
    } catch (error) {
        console.log("Something went wrong");
    }


};