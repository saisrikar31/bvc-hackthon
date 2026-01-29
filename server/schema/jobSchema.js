import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    // BASIC INFO
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    shortDescription: { type: String, maxlength: 300 },
    department: String,
    roleCategory: String,

    // COMPANY
    company: { type: mongoose.Schema.Types.ObjectId, ref: "Company", required: true },

    // JOB DETAILS
    employmentType: { 
        type: String, 
        enum: ["Full-time", "Part-time", "Internship", "Contract", "Temporary", "Freelance"],
        default: "Full-time"
    },
    workMode: { 
        type: String, 
        enum: ["Onsite", "Remote", "Hybrid"], 
        default: "Onsite" 
    },
    location: String,
    country: String,
    state: String,
    city: String,

    // SALARY
    salary : Number,
    currency: { type: String, default: "INR" },
    salaryPeriod: { type: String, enum: ["Yearly", "Monthly", "Hourly"], default: "Yearly" },
    isSalaryVisible: { type: Boolean, default: true },

    // SKILLS & EXPERIENCE
    skillsRequired: [String],
    skillsPreferred: [String],
    experience: {type: String, default: "0-2 years"}, 
    educationRequired: String,
    certifications: [String],

    applicationDeadline: Date,
    applicationLink: String,
    numberOfOpenings: { type: Number, default: 1 },


    applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: "Candidate" }],
    shortlistedCandidates: [{ type: mongoose.Schema.Types.ObjectId, ref: "Candidate" }],

    status: { 
        type: String, 
        enum: ["Open", "Paused", "Closed", "Draft"], 
        default: "Open" 
    },
    visibility: { type: String, enum: ["Public", "Private"], default: "Public" },


    
    applicationsCount: { type: Number, default: 0 },

    
    tags: [String],

    
    contactEmail: String,
    contactPhone: String,


    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Job", jobSchema);
