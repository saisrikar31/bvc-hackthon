import express from "express";
import { createJob, applyJob, createdJobsByCompany, appliedJobsByCandidate, allJobs } from "../controllers/jobController.js";
import { isAuthenticated, isCandidate, isCompany } from "../middlewares/authMiddleware.js";

const jobRouter = express.Router();

jobRouter.post("/create-job", isAuthenticated, isCompany, createJob);
jobRouter.post("/apply-job/:jobId", isAuthenticated, isCandidate, applyJob);
jobRouter.get("/created-jobs-by-company", isAuthenticated, isCompany, createdJobsByCompany);
jobRouter.get("/applied-jobs-by-candidate", isAuthenticated, isCandidate, appliedJobsByCandidate);
jobRouter.get("/all-jobs", isAuthenticated, isCandidate, allJobs);
export default jobRouter;
