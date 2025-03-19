import { io } from "../index.js";
import { chatroomModel } from "../models.js";

const connectionIds = {};   // {email: socket.id}

export function setupSocket() {
    io.on("connection", (socket) => {
        console.log("new connection: " + socket.id);
        const email = socket.handshake.query.email;

        if (email) connectionIds[email] = socket.id;
        // console.log("email: " + socket.handshake.query.email);

        socket.on("disconnect", () => {
            console.log("connection lost: " + socket.id)
            delete connectionIds[socket.handshake.query.email];
        });

        socket.on("newMessage", async (message) => {
            try {
                const res = await chatroomModel.findById(message.chatroom_id);
    
                // notify everyone in the chatroom 
                for (const email of res.emails.split(",")) {
                    if (connectionIds[email]) {
                        io.to(connectionIds[email]).emit("newMessage", message);
                    } 
                }
            } catch (e) {
                console.log(e);
            }
        });

    });
    
    


}

