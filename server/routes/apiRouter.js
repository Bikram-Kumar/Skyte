import express from "express";
import { Router } from "express";

import { createUser , updateUser , retrieveUser , deleteUser, searchUser } from "../controllers/user.controller.js";
import { createChatroom , updateChatroom , deleteChatroom , retrieveChatroom, getChatList } from "../controllers/chatroom.controller.js";
import { createMessage , updateMessage , deleteMessage , getChatMessages } from "../controllers/message.controller.js";

export const apiRouter = Router();

apiRouter.use(express.json());

      
apiRouter.post("/user/create", createUser);
apiRouter.put("/user/update", updateUser);
apiRouter.get("/user/retrieve", retrieveUser);
apiRouter.get("/user/search", searchUser);
apiRouter.delete("/user/delete", deleteUser);

apiRouter.post("/chatroom/create", createChatroom);
apiRouter.put("/chatroom/update", updateChatroom);
apiRouter.get("/chatroom/retrieve", retrieveChatroom);
apiRouter.get("/chatroom/getChatList", getChatList);
apiRouter.delete("/chatroom/delete", deleteChatroom);


apiRouter.post("/message/create", createMessage);
apiRouter.put("/message/update", updateMessage);
apiRouter.get("/message/getChatMessages", getChatMessages);
apiRouter.delete("/message/delete", deleteMessage);
