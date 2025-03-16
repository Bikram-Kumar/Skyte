import { chatroomModel } from "../models.js";

export async function createChatroom(req, res){
	const {emails, isDM} = req.body;

	try {
		const room = await chatroomModel.create({
			emails : emails.toString(),  
			is_dm : isDM
		});
		res.status(200).json(room);
	} catch (error) {
		res.status(200).json(error);
	}


}
export async function updateChatroom(req , res ){

}

// returns chatrooms containing these emails 
export async function retrieveChatroom(req , res ){
	const email1 = req.query.email1;    // ?email1=abc@gmail.com&email2=ghi@gmail.com
	const email2 = req.query.email2;  	
	const isDM = req.query.isDM;  		// ?isDM=true
	const data = await chatroomModel.findOne({
		$and: [
			{emails: {$regex: new RegExp(email1, "i")}},
			{emails: {$regex: new RegExp(email2, "i")}},
			{is_dm : isDM}
		]
	}); 
	if (data) {
		res.status(200).json(data);
	} else {
		res.status(204).send("");
	}

}




export async function deleteChatroom(req , res ){

}