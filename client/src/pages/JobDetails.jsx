import React from "react";
import { useParams } from "react-router-dom";

const JobDetails = () => {
  const { id } = useParams();

  const job = {
    title: "Frontend Developer",
    description:
      "We are looking for a skilled frontend developer to build modern UI applications. Leverage React and Tailwind CSS to create responsive and user-friendly web interfaces.",
    shortDescription: "Build and maintain web interfaces.",
    department: "Engineering",
    roleCategory: "Software Development",
    company: { name: "TechNova Pvt Ltd" },
    employmentType: "Full-time",
    workMode: "Hybrid",
    location: "Bangalore",
    country: "India",
    state: "Karnataka",
    city: "Bangalore",
    salary: 1200000,
    currency: "INR",
    salaryPeriod: "Yearly",
    isSalaryVisible: true,
    skillsRequired: ["React", "JavaScript", "Tailwind CSS"],
    skillsPreferred: ["Next.js", "TypeScript"],
    experience: "1-3 years",
    educationRequired: "B.Tech in Computer Science",
    certifications: ["AWS Certified Developer"],
    applicationDeadline: "2026-02-15",
    applicationLink: "https://company.com/apply",
    numberOfOpenings: 3,
    status: "Open",
    visibility: "Public",
    applicationsCount: 24,
    tags: ["Urgent", "Frontend", "UI"],
    contactEmail: "hr@technova.com",
    contactPhone: "+91 9876543210",
    createdAt: "2026-01-10",
  };

  return (
    <div className="min-h-screen bg-[#0F1720] text-[#E6F1F8] p-6">
      <div className="max-w-5xl mx-auto bg-[#1A2430] border border-[#3A4A5A] rounded-xl p-8 shadow-lg">

        {/* Header */}
        <h1 className="text-3xl font-bold mb-2">{job.title}</h1>
        <p className="text-[#A9BAC6] mb-6">
          <span className="font-semibold text-[#E6F1F8]">Company:</span> {job.company.name}
        </p>

        <Section title="Job Description">
          <p className="text-[#A9BAC6]">{job.description}</p>
        </Section>

        {/* Grid Details */}
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
        <button className="mt-6 w-full bg-[#5B6CFF] hover:bg-[#4C5AE0] text-white py-3 rounded-lg font-semibold transition" onClick={() => document.getElementById('my_modal_2').showModal()}>Apply Now</button>
        <dialog id="my_modal_2" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg"></h3>
            <p className="py-4">Press ESC key or click outside to close</p>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>

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
