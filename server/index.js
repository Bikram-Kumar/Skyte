import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import { apiRouter } from "./routes/apiRouter.js";
import cors from "cors";
import checkAuthJWT from "./middleware/checkAuthJWT.js";
import { Server } from "socket.io";
import http from "http";
import { setupSocket } from "./sockets/sockets.js";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const httpServer = http.createServer(app);
const IS_PRODUCTION = process.env.NODE_ENV == "production";


export const io = new Server(httpServer, {
    cors: {
        origin: [IS_PRODUCTION ? "" : "http://localhost:5173"],
        methods: ["GET"]
    }
});

setupSocket();

if (!IS_PRODUCTION) {
    app.use(cors());
}

// app.use(async (req, res, next) => {
//     console.log(req);
//     next();
// });

const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use("/", express.static(path.join(__dirname, "dist")));


app.use(checkAuthJWT);

app.use((err, req, res, next) => {
    if (err.name === "UnauthorizedError") {
      res.status(401).send("invalid token...");
    } else {
      next(err);
    }
});

app.use("/api", apiRouter);



async function main () {
    await mongoose.connect(process.env.MONGO_URI);
    const port = process.env.PORT;
    httpServer.listen(port);
    console.log("Running on environment: " + process.env.NODE_ENV)
    console.log("Server started on Port: " + port);
}

main();