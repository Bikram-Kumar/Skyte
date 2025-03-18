import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import { apiRouter } from "./routes/apiRouter.js";
import cors from "cors";
import checkAuthJWT from "./middleware/checkAuthJWT.js";
import { Server } from "socket.io";
import http from "http";
import { setupSocket } from "./sockets/sockets.js";

const app = express();
const httpServer = http.createServer(app);

export const io = new Server(httpServer, {
    cors: {
        origin: ["http://localhost:5173"],
        methods: ["GET"]
    }
});

setupSocket();

app.use(cors());
// app.use(async (req, res, next) => {
//     console.log(req);
//     next();
// });


app.use(checkAuthJWT);

app.use("/api", apiRouter);





async function main () {
    await mongoose.connect(process.env.MONGO_URI);
    const port = process.env.PORT || 3000;
    httpServer.listen(port);
    console.log("Server started on port " + port);
}

main();