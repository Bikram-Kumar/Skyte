import {userModel} from "../models.js";




export async function signUp(req, res) {
    const {email, userName, name, password} = req.body;

    try {
        await userModel.create({
            email: email,
            userName: userName,
            name: name,
            password: password
        });
        res.send("User created");
    } catch (error) {
        console.log("Something went wrong");
    }


};