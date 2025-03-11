import "dotenv/config";
import { auth } from "express-oauth2-jwt-bearer";

export default auth({
    audience: 'https://skyte-api',
    issuerBaseURL: process.env.ISSUER_BASE_URL
});
