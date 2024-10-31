import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import { userRouter } from "./routes/user.js";

const app = express();

app.use("/", userRouter);

async function main () {
    await mongoose.connect(process.env.MONGO_URI);
    app.listen(process.env.PORT);
}

main();