import {userModel} from "../models.js";


export async function createUser(req, res) {
    const {email, name, avatar} = req.body;

    try {
        await userModel.create({
            email: email,
            name: name,
            avatar : avatar 
        });
        res.send("User created");
    } catch (error) {
        console.log(error);
        res.send(error.errmsg);
    }


};

export async function updateUser(req , res ){
    const {email, name, avatar} = req.body; 
    try {
        await userModel.findByIdAndUpdate(_id, {
            email: email,
            name: name,
            avatar : avatar 
        }); 
        res.send("updated User"); 
    } catch(error){
        console.log("Something that wrong"); 
    }
}


export async function retrieveUser(req , res ){
    const {email} = req.body;
    try{
        const data = await userModel.findOne({email : email});
        
        if (data) {
            res.status(200).json(data);
        } else {
            res.status(204).json("");               // 204 if user doesn't exist 
        }
    } catch(error){
        console.log("something went wrong");
    }
}



export async function deleteUser(req , res ){
    const { id , userName } = req.body;

    
}

