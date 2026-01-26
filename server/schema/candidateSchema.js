import mongoose from "mongoose";

const candidateSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  skills: [String],
  resume: String,
  appliedJobs: [
    {
      job: { type: mongoose.Schema.Types.ObjectId, ref: "Job" },
      status: { type: String, enum: ["applied", "interview", "rejected", "hired"], default: "applied" },
      appliedAt: { type: Date, default: Date.now },
    },
  ],
});

const Candidate = mongoose.model('Candidate', candidateSchema);

export default Candidate;
