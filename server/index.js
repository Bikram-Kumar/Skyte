import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import { apiRouter } from "./routes/apiRouter.js";
import cors from "cors";
import checkAuthJWT from "./middleware/checkAuthJWT.js";


const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
// app.use(async (req, res, next) => {
//     console.log(req);
//     next();
// });


app.use(checkAuthJWT);

app.use("/api", apiRouter);





async function main () {
    await mongoose.connect(process.env.MONGO_URI);
    app.listen(port);
    console.log("Server started on port " + port);
}

main();