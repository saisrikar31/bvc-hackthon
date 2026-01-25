import express from "express";
import { createJob, applyJob } from "../controllers/jobController.js";
import { isAuthenticated, isCandidate, isCompany } from "../middlewares/authMiddleware.js";

const jobRouter = express.Router();

jobRouter.post("/create-job/:companyId", isAuthenticated, isCompany, createJob);
jobRouter.post("/apply-job", isAuthenticated, isCandidate, applyJob);

export default jobRouter;
