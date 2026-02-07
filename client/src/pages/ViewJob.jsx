import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const ViewJob = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [job, setJob] = useState(null);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const token = localStorage.getItem("Token");
        const res = await axios.get(
          `http://localhost:8000/api/job/get-job-by-id/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }

        );
        console.log("API RESPONSE:", res);
        setJob(res.data.details);
      } catch (error) {
        console.error("Error fetching job details:", error);
      }
    };

    fetchJobDetails();
  }, [id]);

  if (!job) {
    return <div className="min-h-screen bg-base-200">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="hero bg-base-100 py-10">
        <div className="hero-content text-center">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold">{job.title}</h1>
            <p className="py-3">
             {job.location}<br />{job.type}
            </p>
            <span
              className={`badge ${
                job.status === "Open"
                  ? "badge-success"
                  : "badge-error"
              }`}
            >

            </span>

          </div>
        </div>
      </div>

      <div className="w-[80%] mx-auto mt-10 mb-16">
        <div className="card bg-base-100 shadow-md border border-base-300">
          <div className="card-body gap-4">
            <p><strong>Salary:</strong> {job.salary}</p>
            <p><strong>Experience:</strong> {job.experience}</p>

            <div>
              <h3 className="font-semibold mb-2">Job Description</h3>
              <p className="text-sm">{job.description}</p>
            </div>

            <div className="card-actions justify-end mt-6">
              <button
                className="btn btn-warning"
                onClick={() => navigate(`/edit-job/${job._id}`)}
              >
                Edit Job
              </button>
              <button
                className="btn btn-outline"
                onClick={() => navigate("/created-jobs")}
              >
                Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewJob;
