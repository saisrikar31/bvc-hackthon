import { useState } from "react";
import { useNavigate } from "react-router-dom";

const EditJob = () => {
  const navigate = useNavigate();

  const [jobData, setJobData] = useState({
    title: "Frontend Developer",
    location: "Remote",
    type: "Full Time",
    salary: "₹6 – 8 LPA",
    experience: "0–2 Years",
    description:
      "We are looking for a skilled Frontend Developer with good knowledge of React and Tailwind CSS.",
    status: "Open",
  });

  const handleChange = (e) => {
    setJobData({
      ...jobData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Job:", jobData);
    navigate("/company-jobs");
  };

  return (
    <div className="min-h-screen bg-base-200">
      <div className="hero bg-base-100 py-10">
        <div className="hero-content text-center">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold">Edit Job</h1>
            <p className="py-2">Update your job details</p>
          </div>
        </div>
      </div>

      <div className="w-[80%] mx-auto mt-10 mb-16">
        <form
          onSubmit={handleSubmit}
          className="card bg-base-100 shadow-md border border-base-300"
        >
          <div className="card-body gap-4">

            <input
              type="text"
              name="title"
              value={jobData.title}
              onChange={handleChange}
              placeholder="Job Title"
              className="input input-bordered w-full"
              required
            />

            <input
              type="text"
              name="location"
              value={jobData.location}
              onChange={handleChange}
              placeholder="Location"
              className="input input-bordered w-full"
              required
            />

            <select
              name="type"
              value={jobData.type}
              onChange={handleChange}
              className="select select-bordered w-full"
            >
              <option>Full Time</option>
              <option>Part Time</option>
              <option>Internship</option>
            </select>

            <input
              type="text"
              name="salary"
              value={jobData.salary}
              onChange={handleChange}
              placeholder="Salary"
              className="input input-bordered w-full"
            />

            <input
              type="text"
              name="experience"
              value={jobData.experience}
              onChange={handleChange}
              placeholder="Experience"
              className="input input-bordered w-full"
            />

            <textarea
              name="description"
              value={jobData.description}
              onChange={handleChange}
              placeholder="Job Description"
              className="textarea textarea-bordered w-full"
              rows={5}
            />

            <select
              name="status"
              value={jobData.status}
              onChange={handleChange}
              className="select select-bordered w-full"
            >
              <option>Open</option>
              <option>Closed</option>
            </select>

            <div className="card-actions justify-end mt-6">
              <button type="submit" className="btn btn-primary">
                Save Changes
              </button>
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => navigate("/company-jobs")}
              >
                Cancel
              </button>
            </div>

          </div>
        </form>
      </div>
    </div>
  );
};

export default EditJob;
