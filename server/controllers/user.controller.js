import {userModel} from "../models.js";


export async function createUser(req, res) {
    const {email, user_name, name, password , avatar} = req.body;

    try {
        await userModel.create({
            email: email,
            user_name: user_name,
            name: name,
            password: password ,
            avatar : avatar 
        });
        res.send("User created");
    } catch (error) {
        console.log("Something went wrong");
    }


};

export async function updateUser(req , res ){
    const { _id, email, user_name, name, password, avatar} = req.body; 
    try {
        await userModel.findByIdAndUpdate(_id, {
            email: email,
            user_name: user_name,
            name: name,
            password: password ,
            avatar : avatar 
        }); 
        res.send("updated User"); 
    } catch(error){
        console.log("Something that wrong"); 
    }
}


// either provide id or userName, not both
export async function retrieveUser(req , res ){
    const id = req.query.id;
    const userName = req.query.userName;
    try{
        if (id) {
            res.json(await userModel.findById(id)); 
            
        } else if (userName) {
            res.json(await userModel.find({user_name : userName}));
        } else {
            res.send("Provide id or userName");
        }       
    } catch(error){
        console.log("something went wrong");
    }


}
export async function deleteUser(req , res ){

}






















// http://lh:90/api/user/retrieve?objectId=ygsdchbgnrfg&userName