import express from "express";
import { Router } from "express";

import { createUser , updateUser , retrieveUser , deleteUser } from "../controllers/user.controller.js";
import { createChatroom , updateChatroom , deleteChatroom , retrieveChatroom } from "../controllers/chatroom.controller.js";
import { createMessage , updateMessage , deleteMessage , retrieveMessage } from "../controllers/message.controller.js";

export const apiRouter = Router();

apiRouter.use(express.json());

      
apiRouter.post("/user/create", createUser);
apiRouter.put("/user/update", updateUser);
apiRouter.post("/user/retrieve", retrieveUser);
apiRouter.delete("/user/delete", deleteUser);

apiRouter.post("/chatroom/create", createChatroom);
apiRouter.put("/chatroom/update", updateChatroom);
apiRouter.get("/chatroom/retrieve", retrieveChatroom);
apiRouter.delete("/chatroom/delete", deleteChatroom);


apiRouter.post("/message/create", createMessage);
apiRouter.put("/message/update", updateMessage);
apiRouter.get("/message/retrieve", retrieveMessage);
apiRouter.delete("/message/delete", deleteMessage);
