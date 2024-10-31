import express from "express";
import { Router } from "express";

import { signUp } from "../controllers/user.controller.js";

export const userRouter = Router();

userRouter.use(express.json());


userRouter.post("/signup", signUp);