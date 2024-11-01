import express, { Router } from "express";
import mongoose from "mongoose";
import "dotenv/config";
import { apiRouter } from "./routes/routers.js";

const app = express();

app.use("/api", apiRouter);

async function main () {
    await mongoose.connect(process.env.MONGO_URI);
    app.listen(process.env.PORT);
    console.log("started");
}

main();