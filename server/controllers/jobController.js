import Job from "../schema/jobSchema.js";

export const createJob = async (request, response) => {
    const { title, description, skillsRequired, location, salary } = request.body;
    const company = request.params.company;
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

export const applyJob = (request, response) => {
    const userId = request.query;
    const jobId = request.query;
    return response.status(200).json({
        userId: userId,
        jobId: jobId
    })
}  