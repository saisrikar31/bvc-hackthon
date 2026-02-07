import Job from "../schema/jobSchema.js";

export const createJob = async (request, response) => {
    const reqJob = request.body;
    const company = request.user.id;

    console.log(reqJob);

    try {

        console.log("Hello 1")

        // console.log("Request Job Data:", reqJob);

        const job = new Job({
            ...reqJob,
            company: request.user.id
        });

        console.log("Hello 2")

        console.log("New Job Instance:", job);

        if (!job) {
            console.log("Hello 3")
            return response.status(500).json({
                message: "unable to create the job"
            })
        }

        const savedJob = await job.save();

        if (!savedJob) return response.status(500).json({
            message: "error while saving the job application to database",
        })

        return response.status(201).json({
            message: "job application is created successfully",
            details: savedJob,
        })
    } catch (error) {
        return response.status(500).json({
            message: "Internal server error",
            error: error,
        })
    }
}

export const applyJob = async (request, response) => {
    const userId = request.user.id;
    const jobId = request.params.jobId;
    try {
        const job = await Job.findById(jobId);
        if (!job) {
            return response.status(404).json({
                message: "Job not found",
            });
        }
        job.applicants.push(userId);
        await job.save();
        console.log("Updated Job after application:", job);
        return response.status(200).json({
            message: "Job application successful",
            details: job,
        });
    } catch (error) {
        return response.status(500).json({
            message: "Internal server error",
            error: error,
        });
    }
}

export const createdJobsByCompany = async (request, response) => {
    const companyId = request.user.id;
    try {
        const jobs = await Job.find({ company: companyId });
        if (!jobs || jobs.length === 0) {
            return response.status(404).json({
                message: "No jobs found for this company",
            });
        }
        return response.status(200).json({
            message: "Jobs retrieved successfully",
            details: jobs,
        });
    } catch (error) {
        return response.status(500).json({
            message: "Internal server error",
            error: error,
        });
    }
}

export const appliedJobsByCandidate = async (request, response) => {
    const candidateId = request.params.candidateId;
    try {
        const jobs = await Job.find({ applicants: candidateId });
        if (!jobs || jobs.length === 0) {
            return response.status(404).json({
                message: "No applied jobs found for this candidate",
            });
        }
        return response.status(200).json({
            message: "Applied jobs retrieved successfully",
            details: jobs,
        });
    } catch (error) {
        return response.status(500).json({
            message: "Internal server error",
            error: error,
        });
    }
}

export const deleteJobByCompany = async (request, response) => {
    const { jobId } = request.params;
    try {
        const deletedJob = await Job.findByIdAndDelete(jobId);
        if (!deletedJob) {
            return response.status(404).json({
                message: "Job not found",
            });
        }
        return response.status(200).json({
            message: "Job deleted successfully",
            details: deletedJob,
        });
    } catch (error) {
        return response.status(500).json({
            message: "Internal server error",
            error: error,
        });
    }
}
export const updateJobByCompany = async (request, response) => {
    const { jobId } = request.params;
    const updateData = request.body;
    try {
        const updatedJob = await Job.findByIdAndUpdate(jobId, updateData, { new: true });
        if (!updatedJob) {
            return response.status(404).json({
                message: "Job not found",
            });
        }
        return response.status(200).json({
            message: "Job updated successfully",
            details: updatedJob,
        });
    } catch (error) {
        return response.status(500).json({
            message: "Internal server error",
            error: error,
        });
    }
}

export const removeJobApplicationByCandidate = async (request, response) => {
    const { jobId, candidateId } = request.query;
    try {
        const job = await Job.findById(jobId);
        if (!job) {
            return response.status(404).json({
                message: "Job not found",
            });
        }
        job.applicants = job.applicants.filter(applicantId => applicantId.toString() !== candidateId);
        await job.save();
        return response.status(200).json({
            message: "Job application removed successfully",
            details: job,
        });
    } catch (error) {
        return response.status(500).json({
            message: "Internal server error",
            error: error,
        });
    }
}

export const allJobs = async (request, response) => {
    try {
        const jobs = await Job.find();
        return response.status(200).json({
            message: "All jobs retrieved successfully",
            details: jobs,
        });
    } catch (error) {
        return response.status(500).json({
            message: "Internal server error",
            error: error,
        });
    }
}

export const getJobById = async (request, response) => {
    const { jobId } = request.params;
    try {
        const job = await Job.findById(jobId);
        if (!job) {
            return response.status(404).json({
                message: "Job not found",
            });
        }
        return response.status(200).json({
            message: "Job retrieved successfully",
            details: job,
        });
    } catch (error) {
        return response.status(500).json({
            message: "Internal server error",
            error: error,
        });
    }
}

export const editJob = async (request, response) => {
    const { jobId } = request.params;
    const updateData = request.body;
    try {
        const updatedJob = await Job.findByIdAndUpdate(jobId, updateData, { new: true });
        if (!updatedJob) {
            return response.status(404).json({
                message: "Job not found",
            });
        }
        return response.status(200).json({
            message: "Job updated successfully",
            details: updatedJob,
        });
    } catch (error) {
        return response.status(500).json({
            message: "Internal server error",
            error: error,
        });
    }
}

export const applicantsForJob = async (request, response) => {
    const { jobId } = request.params;
    try {
        const job = await Job.findById(jobId).populate("applicants", "name email");
        if (!job) {
            return response.status(404).json({
                message: "Job not found",
            });
        }
        return response.status(200).json({
            message: "Applicants retrieved successfully",
            details: job.applicants,
        });
    } catch (error) {
        return response.status(500).json({
            message: "Internal server error",
            error: error,
        });
    }
}
