import { useState } from "react";
import axios from "axios";
export default function CreateJob() {


  const [response, setResponse] = useState("");

  const [job, setJob] = useState({
    title: "",
    description: "",
    shortDescription: "",
    department: "",
    roleCategory: "",
    employmentType: "Full-time",
    workMode: "Onsite",
    location: "",
    country: "",
    state: "",
    city: "",
    salary: "",
    currency: "INR",
    salaryPeriod: "Yearly",
    isSalaryVisible: true,
    skillsRequired: "",
    skillsPreferred: "",
    experience: "0-2 years",
    educationRequired: "",
    certifications: "",
    applicationDeadline: "",
    applicationLink: "",
    numberOfOpenings: 1,
    status: "Open",
    visibility: "Public",
    tags: "",
    contactEmail: "",
    contactPhone: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setJob({ ...job, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedJob = {
      ...job,
      salary: Number(job.salary),
      numberOfOpenings: Number(job.numberOfOpenings),
      skillsRequired: job.skillsRequired.split(",").map(s => s.trim()),
      skillsPreferred: job.skillsPreferred.split(",").map(s => s.trim()),
      certifications: job.certifications.split(",").map(s => s.trim()),
      tags: job.tags.split(",").map(s => s.trim()),
    };

    try {
      const token = localStorage.getItem("Token");
      const res = await axios.post("http://localhost:8000/api/job/create-job", formattedJob, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setResponse(res.data);
      alert("Job posted successfully!");
    } catch (error) {
      console.error("Error posting job:", error);
      setResponse("Error posting job");
    }

  };

  return (
    <div className="min-h-screen bg-[#0F1720] text-[#E6F1F8] p-6">
      <div className="max-w-5xl mx-auto bg-[#1A2430] shadow-xl rounded-xl p-8 border border-[#3A4A5A]">
        <h2 className="text-2xl font-bold mb-6">Create Job Post</h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <Input label="Job Title *" name="title" value={job.title} onChange={handleChange} required />
          <Input label="Department" name="department" value={job.department} onChange={handleChange} />

          <TextArea label="Full Description *" name="description" value={job.description} onChange={handleChange} required colSpan />
          <TextArea label="Short Description" name="shortDescription" value={job.shortDescription} onChange={handleChange} colSpan />

          <Select label="Employment Type" name="employmentType" value={job.employmentType} onChange={handleChange}
            options={["Full-time", "Part-time", "Internship", "Contract", "Temporary", "Freelance"]} />

          <Select label="Work Mode" name="workMode" value={job.workMode} onChange={handleChange}
            options={["Onsite", "Remote", "Hybrid"]} />

          <Input label="City" name="city" value={job.city} onChange={handleChange} />
          <Input label="State" name="state" value={job.state} onChange={handleChange} />
          <Input label="Country" name="country" value={job.country} onChange={handleChange} />

          <Input label="Salary" name="salary" type="number" value={job.salary} onChange={handleChange} />

          <Select label="Salary Period" name="salaryPeriod" value={job.salaryPeriod} onChange={handleChange}
            options={["Yearly", "Monthly", "Hourly"]} />

          <div className="flex items-center gap-2 mt-6">
            <input type="checkbox" name="isSalaryVisible" checked={job.isSalaryVisible} onChange={handleChange} />
            <label className="text-[#A9BAC6]">Show Salary Publicly</label>
          </div>

          <Input label="Skills Required (comma separated)" name="skillsRequired" value={job.skillsRequired} onChange={handleChange} />
          <Input label="Preferred Skills" name="skillsPreferred" value={job.skillsPreferred} onChange={handleChange} />

          <Input label="Experience" name="experience" value={job.experience} onChange={handleChange} />
          <Input label="Education Required" name="educationRequired" value={job.educationRequired} onChange={handleChange} />

          <Input label="Application Deadline" name="applicationDeadline" type="date" value={job.applicationDeadline} onChange={handleChange} />
          <Input label="Number of Openings" name="numberOfOpenings" type="number" value={job.numberOfOpenings} onChange={handleChange} />

          <Input label="Tags (comma separated)" name="tags" value={job.tags} onChange={handleChange} colSpan />

          <Input label="Contact Email" name="contactEmail" type="email" value={job.contactEmail} onChange={handleChange} />
          <Input label="Contact Phone" name="contactPhone" value={job.contactPhone} onChange={handleChange} />

          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-[#5B6CFF] hover:bg-[#4C5AE0] text-white py-3 rounded-lg font-semibold transition"
              onClick={handleSubmit}
            >
              Post Job
            </button>
            <div className="text-center pt-3">
              <p>{response}</p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

/* Reusable Components */

const Input = ({ label, colSpan, ...props }) => (
  <div className={colSpan ? "md:col-span-2" : ""}>
    <label className="block text-[#A9BAC6] font-medium">{label}</label>
    <input {...props} className="input-dark" required/>
  </div>
);

const TextArea = ({ label, colSpan, ...props }) => (
  <div className={colSpan ? "md:col-span-2" : ""}>
    <label className="block text-[#A9BAC6] font-medium">{label}</label>
    <textarea {...props} rows="4" className="input-dark" required/>
  </div>
);

const Select = ({ label, options, ...props }) => (
  <div>
    <label className="block text-[#A9BAC6] font-medium">{label}</label>
    <select {...props} className="input-dark">
      {options.map(opt => <option key={opt}>{opt}</option>)}
    </select>
  </div>
);
