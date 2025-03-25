import "dotenv/config";
import { auth } from "express-oauth2-jwt-bearer";

export default function checkAuthJWT(req, res, next) {
    try {
        auth({
            audience: 'https://skyte-api',
            issuerBaseURL: process.env.ISSUER_BASE_URL
        });
        next();
    } catch(e) {
        console.log(e);
        console.log(req);
    }
};