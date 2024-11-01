import { chatroomModel } from "../models.js";

export async function createChatroom(req, res){
	const {participant_ids, last_message, avatar} = req.body;

	try {
		await chatroomModel.create({
			participant_ids : participant_ids,                   // comma separeted string of hex `ObjectId`s
			last_message : last_message,
			avatar:avatar
		});
		res.send("chatroom created");
	} catch (error) {
		console.log("Something went wrong");
	}


}
export async function updateChatroom(req , res ){

}
export async function retrieveChatroom(req , res ){

}
export async function deleteChatroom(req , res ){

}