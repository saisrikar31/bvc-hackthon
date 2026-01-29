import { Link } from "react-router-dom";

const JobCard = ({ id, title, company, location, skills = [], salary }) => {
  return (
    <Link to={`/job-details/${id}`}>
      <div className="bg-[#1A2430] border border-[#3A4A5A] rounded-xl p-5 hover:border-[#5B6CFF] transition">
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-[#A9BAC6] text-sm mt-1">{company}</p>
        <p className="text-[#A9BAC6] text-sm">{location}</p>

        <div className="flex flex-wrap gap-2 mt-3">
          {skills.map((skill, i) => (
            <span
              key={i}
              className="text-xs px-2 py-1 border border-[#3A4A5A] rounded-md text-[#A9BAC6]"
            >
              {skill}
            </span>
          ))}
        </div>

        <div className="mt-4 text-sm font-medium text-[#E6F1F8]">
          {salary}
        </div>
      </div>
    </Link>
  );
};

export default JobCard;
