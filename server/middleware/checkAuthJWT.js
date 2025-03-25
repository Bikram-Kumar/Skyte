import "dotenv/config";
import { auth } from "express-oauth2-jwt-bearer";

const check = auth({
    audience: 'https://skyte-api',
    issuerBaseURL: process.env.ISSUER_BASE_URL
});

export default function checkAuthJWT(req, res, next) {
    try {
        check(req, res, next);
    } catch(e) {
        console.log(e);
        console.log(req);
    }
};