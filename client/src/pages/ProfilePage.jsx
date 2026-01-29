import React from "react";

const ProfilePage = () => {
  // Dummy candidate data (replace with API data)
  const candidate = {
    name: "Nani Kumar",
    email: "nani@email.com",
    skills: ["React", "JavaScript", "Node.js", "MongoDB"],
    resume: "https://example.com/resume.pdf",
    appliedJobs: [
      { jobTitle: "Frontend Developer", status: "interview" },
      { jobTitle: "Backend Intern", status: "applied" },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f172a] to-[#0b1120] text-white p-6">
      
      {/* Page Title */}
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>

      {/* Profile Card */}
      <div className="card bg-base-200 shadow-xl p-6 mb-8">
        <div className="flex flex-col md:flex-row items-center gap-6">
          
          {/* Avatar */}
          <div className="avatar">
            <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src="https://ui-avatars.com/api/?name=Nani+Kumar&background=1d4ed8&color=fff" alt="Profile" />
            </div>
          </div>

          {/* Info */}
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-semibold">{candidate.name}</h2>
            <p className="text-gray-400">{candidate.email}</p>

            <a
              href={candidate.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-sm mt-3"
            >
              View Resume
            </a>
          </div>
        </div>
      </div>

      {/* Skills Section */}
      <div className="card bg-base-200 shadow-xl p-6 mb-8">
        <h3 className="text-xl font-semibold mb-4">Skills</h3>
        <div className="flex flex-wrap gap-2">
          {candidate.skills.map((skill, index) => (
            <div key={index} className="badge badge-primary badge-outline p-3">
              {skill}
            </div>
          ))}
        </div>
      </div>

      {/* Applied Jobs Section */}
      <div className="card bg-base-200 shadow-xl p-6">
        <h3 className="text-xl font-semibold mb-4">Applied Jobs</h3>

        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Job Title</th>
                <th>Status</th>
                <th>Remove application</th>
              </tr>
            </thead>
            <tbody>
              {candidate.appliedJobs.map((job, index) => (
                <tr key={index}>
                  <td>{job.jobTitle}</td>
                  <td>
                    <span
                      className={`badge ${
                        job.status === "hired"
                          ? "badge-success"
                          : job.status === "rejected"
                          ? "badge-error"
                          : job.status === "interview"
                          ? "badge-warning"
                          : "badge-info"
                      }`}
                    >
                      {job.status}
                    </span>
                  </td>
                  <td>
                    <button className="btn btn-sm btn-error">Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
