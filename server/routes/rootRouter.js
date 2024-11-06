import express from "express";
import { Router } from "express";


export const rootRouter = Router();

rootRouter.use(express.json());
      

rootRouter.get("/", function (req, res, next) {
      console.log(req.oidc);
      res.render('index', {
            title: 'Skyte',
            isAuthenticated: req.oidc.isAuthenticated()
      });
});