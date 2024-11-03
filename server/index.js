import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import { apiRouter } from "./routes/apiRouter.js";
import { rootRouter } from "./routes/rootRouter.js";
import logger from 'morgan';
import path from 'path';
import {auth} from 'express-openid-connect';

const app = express();


const config = {
    authRequired: false,
    auth0Logout: true 
};

const port = process.env.PORT || 3000;

const __dirname = import.meta.dirname;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));

app.use("/api", apiRouter);
app.use("/", rootRouter);

if (!config.baseURL && !process.env.BASE_URL && process.env.PORT && process.env.NODE_ENV !== 'production') {
    config.baseURL = `http://localhost:${port}`;
}

app.use(auth(config));

// Middleware to make the `user` object available for all views
app.use(function (req, res, next) {
    res.locals.user = req.oidc.user;
    next();
});

async function main () {
    await mongoose.connect(process.env.MONGO_URI);
    app.listen(port);
    console.log("started");
}

main();