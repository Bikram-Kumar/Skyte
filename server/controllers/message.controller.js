import { messageModel } from "../models.js";

export async function createMessage(req , res ){
    const {sender, chatId, message} = req.body;

    try {
        const mess = await messageModel.create({
            sender : sender,
            chatroom_id : chatId,
            message : message ,
            time: Date.now(),
            seen_status: 0
        });
        res.status(200).json(mess);
    } catch (error) {
        res.status(200).json(error);
    }
}
export async function updateMessage(req , res ){

}


export async function getChatMessages(req , res){
    const chatId = req.query.chatId;
    const data = await messageModel.find({
        chatroom_id: chatId
    });
    res.status(200).json(data);
}


export async function deleteMessage(req , res ){

}