import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import VK from "./VK.jsx";

const CreatedJobs = () => {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem("Token");
        if (!token) {
          throw new Error("No token found. Please login again.");
        }

        const response = await fetch(
          "http://localhost:8000/api/job/created-jobs-by-company",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("STATUS:", response.status);

        if (!response.ok) {
          const text = await response.text();
          throw new Error(text || "Failed to fetch jobs");
        }

        const data = await response.json();
        console.log("API DATA:", data);


        if (!Array.isArray(data.details)) {
          throw new Error("Invalid response format");
        }


        const mappedJobs = data.details.map((job) => ({
          _id: job._id,
          title: job.title,
          status: job.status || "Open",
          location: job.location || job.city || "N/A",
          type: job.type || job.employmentType || "N/A",
          salary: job.salary ?? "N/A",
        }));

        setJobs(mappedJobs);
      } catch (err) {
        console.error("ERROR:", err);
        setError(err.message.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Loading jobs...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500 font-semibold">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="hero bg-base-100 py-12">
        <div className="hero-content text-center">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold">Your Posted Jobs</h1>
            <button
              className="btn btn-primary mt-4"
              onClick={() => navigate("/create-job")}
            >
              Post New Job
            </button>
          </div>
        </div>
      </div>

      <div className="w-[85%] mx-auto mt-10 mb-16">
        {jobs.length === 0 ? (
          <div className="text-center bg-base-100 p-10 rounded-xl shadow">
            <h2 className="text-2xl font-semibold">No jobs found</h2>
          </div>
        ) : (
          <div className="grid gap-6">
            {jobs.map((job) => (
              <div
                key={job._id}
                className="card bg-base-100 shadow-md border"
              >
                <div className="card-body">
                  <div className="flex justify-between items-center">
                    <h2 className="card-title">{job.title}</h2>
                    <span className="badge badge-success">{job.status}</span>
                  </div>

                  <p className="text-sm">
                    {job.location} • {job.type}
                  </p>

                  <p className="font-semibold"> {job.salary}</p>

                  <div className="card-actions justify-end">
                    <button
                      className="btn btn-outline btn-sm"
                      onClick={() => navigate(`/vk`)}
                    >
                      View applications
                    </button>
                    <button
                      className="btn btn-outline btn-sm"
                      onClick={() => navigate(`/view-job/${job._id}`)}
                    >
                      View
                    </button>
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => navigate(`/edit-job/${job._id}`)}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CreatedJobs;
