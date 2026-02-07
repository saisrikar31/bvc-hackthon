
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const token = localStorage.getItem("Token");
        const res = await axios.get(
          `http://localhost:8000/api/job/get-job-by-id/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setJob(res.data.details);
      } catch (err) {
        console.error(err);
      }
    };

    fetchJobDetails();
  }, [id]);



  if (!job) return <p>Loading job details...</p>;

  const applyJob = async () => {
    try {
      const token = localStorage.getItem("Token");
      await axios.post(
        `http://localhost:8000/api/job/apply-job/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      document.getElementById('my_modal_2').showModal();
    } catch (err) {
      console.error(err);
    }
  };


  return (
    <div className="min-h-screen bg-[#0F1720] text-[#E6F1F8] p-6">
      <div className="max-w-5xl mx-auto bg-[#1A2430] border border-[#3A4A5A] rounded-xl p-8 shadow-lg">


        <h1 className="text-3xl font-bold mb-2">{job.title}</h1>

        <Section title="Job Description">
          <p className="text-[#A9BAC6]">{job.description}</p>
        </Section>


        <div className="grid md:grid-cols-2 gap-10">
          <Detail label="Department" value={job.department} />
          <Detail label="Role Category" value={job.roleCategory} />
          <Detail label="Experience Required" value={job.experience} />
          <Detail label="Employment Type" value={job.employmentType} />
          <Detail label="Openings" value={job.numberOfOpenings} />
          <Detail label="Applications" value={job.applicationsCount} />
          <Detail label="Application Deadline" value={new Date(job.applicationDeadline).toLocaleDateString()} />
          <Detail label="Location" value={`${job.city}, ${job.state}, ${job.country}`} />
        </div>

        <Section title="Salary">
          <p className="text-[#A9BAC6]">
            {job.isSalaryVisible
              ? `${job.salary.toLocaleString()} ${job.currency} / ${job.salaryPeriod}`
              : "Not Disclosed"}
          </p>
        </Section>

        <Section title="Skills Required">
          <div className="flex flex-wrap gap-2">
            {job.skillsRequired.map((skill, i) => (
              <span key={i} className="px-3 py-1 text-sm rounded-full border border-[#3A4A5A] bg-[#0F1720] text-[#E6F1F8]">
                {skill}
              </span>
            ))}
          </div>
        </Section>

        <Section title="Preferred Skills">
          <div className="flex flex-wrap gap-2">
            {job.skillsPreferred.map((skill, i) => (
              <span key={i} className="px-3 py-1 text-sm rounded-full border border-[#3A4A5A] bg-[#0F1720] text-[#A9BAC6]">
                {skill}
              </span>
            ))}
          </div>
        </Section>

        <Section title="Education & Certifications">
          <p className="text-[#A9BAC6]">{job.educationRequired}</p>
          <ul className="list-disc ml-5 text-[#A9BAC6]">
            {job.certifications.map((cert, i) => <li key={i}>{cert}</li>)}
          </ul>
        </Section>

        <Section title="Contact Information">
          <p><span className="font-semibold">Email:</span> {job.contactEmail}</p>
          <p><span className="font-semibold">Phone:</span> {job.contactPhone}</p>
        </Section>

        {/* Apply Button */}


        {/* Open the modal using document.getElementById('ID').showModal() method */}
        <button className="w-full" onClick={applyJob}>
          <button className="mt-6 w-full bg-[#5B6CFF] hover:bg-[#4C5AE0] text-white py-3 rounded-lg font-semibold transition" onClick={() => document.getElementById('my_modal_2').showModal()}>Apply Now</button>
          <dialog id="my_modal_2" className="modal">
            <div className="modal-box">
              <h3 className="font-bold text-lg"></h3>
              <p className="py-4">Job applied sucessfully. check in profile section <br /> Press ESC to close</p>
            </div>
            <form method="dialog" className="modal-backdrop">
              <button>close</button>
            </form>
          </dialog>
        </button>

      </div>
    </div>
  );
};

export default JobDetails;


const Section = ({ title, children }) => (
  <div className="mt-8">
    <h2 className="text-xl font-semibold mb-2">{title}</h2>
    <div className="border-t border-[#3A4A5A] pt-4">{children}</div>
  </div>
);

const Detail = ({ label, value }) => (
  <div>
    <h3 className="font-semibold text-[#E6F1F8]">{label}</h3>
    <p className="text-[#A9BAC6] italic">{value}</p>
  </div>
);
