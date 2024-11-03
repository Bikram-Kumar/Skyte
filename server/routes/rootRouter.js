import express from "express";
import { Router } from "express";


export const rootRouter = Router();

rootRouter.use(express.json());
      

rootRouter.get("/", function (req, res, next) {
      const isAuthenticated = req.oidc ? req.oidc.isAuthenticated() : false;
      res.render('index', {
            title: 'Skyte',
            isAuthenticated: isAuthenticated
      });
});