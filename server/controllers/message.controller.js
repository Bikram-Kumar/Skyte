export async function createMessage(req , res ){
    const {sender_id, chatroom_id, message, time , seen_status} = req.body;

    try {
        await userModel.create({
            sender_id : sender_id,
            chatroom_id : chatroom_id,
            message : message ,
            time: time,
            seen_status: seen_status
        });
        res.send("message created");
    } catch (error) {
        console.log("Something went wrong");
    }
}
export async function updateMessage(req , res ){

}
export async function retrieveMessage(req , res ){

}
export async function deleteMessage(req , res ){

}