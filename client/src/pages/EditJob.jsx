import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

const EditJob = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [jobData, setJobData] = useState({
    title: "",
    location: "",
    type: "",
    salary: "",
    experience: "",
    description: "",
    status: "Open",
  });

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const token = localStorage.getItem("Token");
        const res = await axios.get(
          `http://localhost:8000/api/job/get-job-by-id/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const job = res.data.details;
        setJobData({
          title: job.title || "",
          location: job.location || "",
          type: job.employmentType || "",
          salary: job.salary || "",
          experience: job.experience || "",
          description: job.description || "",
          status: job.status || "Open",
        });
      }
      catch (err) {
        console.error(err);
      }
    };

    fetchJobDetails();
  }, [id]);

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

  const updateJobDetails = async () => {
    try {
      const token = localStorage.getItem("Token");
      await axios.put(
        `http://localhost:8000/api/job/edit-job/${id}`,
        jobData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Job updated successfully!");
      navigate("/created-jobs");
    } catch (err) {2
      console.error("Error updating job:", err);
      alert("Failed to update job. Please try again.");
    }
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

            />

            <input
              type="text"
              name="location"
              value={jobData.location}
              onChange={handleChange}
              placeholder="Location"
              className="input input-bordered w-full"

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
              <button type="submit" className="btn btn-primary" onClick={updateJobDetails}>
                Save Changes
              </button>
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => navigate("/created-jobs")}
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
