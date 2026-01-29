import JobHeader from "../components/JobHeader.jsx";
import JobCard from "../components/JobCard.jsx";
import JobFilter from "../components/JobFilter.jsx";
import { useEffect, useState } from "react";
import axios from "axios";

const JobSection = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("Token");

    axios
      .get("http://localhost:8000/api/job/all-jobs", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setJobs(response.data.details);
      })
      .catch((error) => {
        console.error("Error fetching jobs:", error);
      });
  }, []);

  return (
    <div className="min-h-screen bg-[#0F1720] text-[#E6F1F8]">
      <JobHeader />

      {/* Filter Bar */}
      <div className="flex justify-end px-[10%] mt-6">
        
          <JobFilter className=""/>
        
      </div>

      {/* Job List */}
      <div className="mt-10 px-[10%] pb-16">
        <div className="flex flex-col gap-4">
          {jobs && jobs.length > 0 ? (
            jobs.map((job) => (
              <JobCard
                key={job._id}
                id={job._id}
                title={job.title}
                company={job.company?.name}
                location={`${job.city || ""}, ${job.state || ""}`}
                skills={job.skillsRequired?.slice(0, 3)}
                salary={
                  job.isSalaryVisible
                    ? `${job.salary?.toLocaleString()} ${job.currency}`
                    : "Not Disclosed"
                }
              />
            ))
          ) : (
            <p className="text-[#A9BAC6] text-center mt-10">
              No jobs available right now.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobSection;
