import express from "express";
import { createJob, applyJob, createdJobsByCompany, appliedJobsByCandidate, allJobs, getJobById, editJob, applicantsForJob } from "../controllers/jobController.js";
import { isAuthenticated, isCandidate, isCompany } from "../middlewares/authMiddleware.js";

const jobRouter = express.Router();

jobRouter.post("/create-job", isAuthenticated, isCompany, createJob);
jobRouter.put("/edit-job/:jobId", isAuthenticated, isCompany, editJob);
jobRouter.post("/apply-job/:jobId", isAuthenticated, isCandidate, applyJob);
jobRouter.get("/created-jobs-by-company", isAuthenticated, isCompany, createdJobsByCompany);
jobRouter.get("/applied-jobs-by-candidate/:candidateId", isAuthenticated, isCandidate, appliedJobsByCandidate);
jobRouter.get("/all-jobs", isAuthenticated, isCandidate, allJobs);
jobRouter.get("/get-job-by-id/:jobId", getJobById);
jobRouter.get("/applicants-for-job/:jobId", isAuthenticated, isCompany, applicantsForJob);

export default jobRouter;
