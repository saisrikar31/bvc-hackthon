import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    skillsRequired: [String],
    company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
    location: String,
    salary: String,
    applicants: [
        { type: mongoose.Schema.Types.ObjectId, ref: "Candidate" }
    ],
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Job", jobSchema);
