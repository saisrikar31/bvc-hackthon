import express from "express";

import { registerCandidate, registerCompany, loginCandidate, loginCompany } from "../controllers/authController.js";


const authRouter = express.Router();

// candidates
authRouter.post("/auth/register-candidate", registerCandidate);
authRouter.post("/auth/login-candidate", loginCandidate);

// companies
authRouter.post("/auth/register-company", registerCompany);
authRouter.post("/auth/login-company", loginCompany);
