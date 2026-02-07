import { useNavigate } from "react-router-dom";

const ViewJob = () => {
  const navigate = useNavigate();

  const job = {
    title: "Frontend Developer",
    location: "Remote",
    type: "Full Time",
    salary: "₹6 – 8 LPA",
    experience: "0–2 Years",
    description:
      "We are looking for a skilled Frontend Developer with good knowledge of React and Tailwind CSS.",
    status: "Open",
  };

  return (
    <div className="min-h-screen bg-base-200">
      <div className="hero bg-base-100 py-10">
        <div className="hero-content text-center">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold">{job.title}</h1>
            <p className="py-3">
              📍 {job.location} • 💼 {job.type}
            </p>
            <span
              className={`badge ${
                job.status === "Open"
                  ? "badge-success"
                  : "badge-error"
              }`}
            >
              {job.status}
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
                onClick={() => navigate("/edit-job/1")}
              >
                Edit Job
              </button>
              <button
                className="btn btn-outline"
                onClick={() => navigate("/company-jobs")}
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
