import express, { response } from 'express';
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";
import { registerCandidate } from './controllers/authController.js';

const app = express();

const port = process.env.PORT;
const url = process.env.ENVIRONMENT == 'development' ? `http://localhost:${port}` : process.env.PRODUCTION_URL; 

connectDB();

app.get("/", (request, response) => {
    response.status(200).send("<h1>Server Running</h1>");
})


app.listen(8000, () => console.log(`server running on ${url}`));