import express from 'express';

// application configuration imports
import cors from "cors";
import "dotenv/config";

// database import
import connectDB from "./config/db.js";

// router imports
import jobRouter from './routes/jobRoutes.js';
import authRouter from './routes/authRoutes.js';
import { isAuthenticated, isCompany } from './middlewares/authMiddleware.js';


// application configuration
const app = express();
app.use(express.json());
app.use(cors());

// development/production setup
const port = process.env.PORT;
const url = process.env.ENVIRONMENT == 'development' ? `http://localhost:${port}` : process.env.PRODUCTION_URL; 

// database connection
connectDB();

// checking the application status
app.get("/", (request, response) => {
    response.status(200).send("<h1>Server Running</h1>");
})

app.post("/auth-check", isAuthenticated, isCompany, (request, response) => {
    response.status(200).json({
        message: "authentication route working fine",
    });
});

// routing setup
app.use("/api/auth", authRouter);
app.use("/api/job", jobRouter);


// application listening
app.listen(8000, () => console.log(`server running on ${url}`));
