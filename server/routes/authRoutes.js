import express from "express";

import { registerCandidate, registerCompany, loginCandidate, loginCompany } from "../controllers/authController.js";


const authRouter = express.Router();

// candidates
authRouter.post("/register-candidate", registerCandidate);
authRouter.post("/login-candidate", loginCandidate);

// companies
authRouter.post("/register-company", registerCompany);
authRouter.post("/login-company", loginCompany);

export default authRouter;
