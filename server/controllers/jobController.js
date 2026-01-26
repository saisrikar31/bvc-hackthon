import Job from "../schema/jobSchema.js";

export const createJob = async (request, response) => {
    const { title, description, skillsRequired, location, salary } = request.body;
    const company = request.user.id;
    try {
        const job = new Job({
            title: title,
            description: description,
            skillsRequired: skillsRequired,
            location: location,
            salary: salary,
            company: company,
        })

        if (!job) return response.status(500).json({
            message: "unable to create the job"
        })

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

export const applyJob = async(request, response) => {
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
    const candidateId = request.user.id;
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
