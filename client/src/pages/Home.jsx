import Header from '../components/Header.jsx';
import { useNavigate } from 'react-router-dom';

const Home = () => {

  const navigate = useNavigate();

  const jobSeekers = (e) => {
    console.log("job seekers clicked");
    e.target.innerHTML = "Loading...";
    navigate('/auth-job-seeker');
  }

  const employers = (e) => {
    console.log("employers clicked");
    e.target.innerHTML = "Loading...";
    navigate('/auth-employer');
  }

  return (
    <div>

      <div className="hero bg-base-200 min-h-screen min-w-full">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <p className="text-6xl font-bold max-w-full">Connect with Top Talent & Find Your Dream Job</p>
            <p className="py-6">
              Matching the best candidates with the perfect opportunities. Our platform
              simplifies your job search and hiring process.
            </p>
            <div className='flex justify-center gap-4'>
              <button className="btn border-white" onClick={jobSeekers}>For Job Seekers</button>
              <button className="btn btn-primary" onClick={employers}>For Employers</button>
            </div>
          </div>
        </div>
      </div>



            {/* FEATURES SECTION */}
      <div className="bg-base-100 py-16">
        <h2 className="text-4xl font-bold text-center mb-10">
          Why Choose Our Platform?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-[80%] m-auto">
          <div className="card bg-base-200 shadow-md">
            <div className="card-body text-center">
              <h3 className="card-title justify-center">Verified Jobs</h3>
              <p>All job listings are verified to ensure authenticity and trust.</p>
            </div>
          </div>

          <div className="card bg-base-200 shadow-md">
            <div className="card-body text-center">
              <h3 className="card-title justify-center">Smart Matching</h3>
              <p>AI-powered matching connects candidates with the right roles.</p>
            </div>
          </div>

          <div className="card bg-base-200 shadow-md">
            <div className="card-body text-center">
              <h3 className="card-title justify-center">Fast Hiring</h3>
              <p>Employers can post jobs and hire talent faster than ever.</p>
            </div>
          </div>
        </div>
      </div>

      {/* HOW IT WORKS */}
      <div className="bg-base-200 py-16">
        <h2 className="text-4xl font-bold text-center mb-10">How It Works</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-[80%] m-auto">
          <div className="card bg-base-100 shadow-md">
            <div className="card-body">
              <h3 className="card-title">For Job Seekers</h3>
              <ul className="list-disc ml-5 space-y-2">
                <li>Create your profile</li>
                <li>Apply to verified jobs</li>
                <li>Track applications</li>
                <li>Get hired faster</li>
              </ul>
            </div>
          </div>

          <div className="card bg-base-100 shadow-md">
            <div className="card-body">
              <h3 className="card-title">For Employers</h3>
              <ul className="list-disc ml-5 space-y-2">
                <li>Post job openings</li>
                <li>Browse skilled candidates</li>
                <li>Shortlist and interview</li>
                <li>Hire top talent</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* STATS SECTION */}
      <div className="bg-base-100 py-16">
        <div className="stats shadow w-[80%] m-auto flex flex-col md:flex-row">
          <div className="stat text-center">
            <div className="stat-title">Jobs Posted</div>
            <div className="stat-value text-primary">25K+</div>
          </div>

          <div className="stat text-center">
            <div className="stat-title">Candidates</div>
            <div className="stat-value text-secondary">100K+</div>
          </div>

          <div className="stat text-center">
            <div className="stat-title">Companies</div>
            <div className="stat-value">5K+</div>
          </div>
        </div>
      </div>

      {/* TESTIMONIALS */}
      <div className="bg-base-200 py-16">
        <h2 className="text-4xl font-bold text-center mb-10">
          What Users Say
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-[80%] m-auto">
          <div className="card bg-base-100 shadow-md">
            <div className="card-body">
              <p>
                “I got my first developer job within two weeks. The platform is
                simple and effective.”
              </p>
              <h4 className="font-semibold mt-4">— Job Seeker</h4>
            </div>
          </div>

          <div className="card bg-base-100 shadow-md">
            <div className="card-body">
              <p>
                “Hiring quality candidates has never been this easy. Highly
                recommended!”
              </p>
              <h4 className="font-semibold mt-4">— Employer</h4>
            </div>
          </div>
        </div>
      </div>

      {/* FINAL CTA */}
      <div className="bg-primary text-primary-content py-16 text-center">
        <h2 className="text-4xl font-bold mb-6">
          Ready to Get Started?
        </h2>
        <p className="mb-6">
          Join thousands of job seekers and employers today.
        </p>
        <div className="flex justify-center gap-4">
          <button className="btn btn-outline border-white text-white" onClick={jobSeekers}>
            Join as Job Seeker
          </button>
          <button className="btn bg-white text-primary" onClick={employers}>
            Hire Talent
          </button>
        </div>
      </div>

    </div>
  )
}

export default Home
