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

      <div className='w-[80%] flex justify-center flex-col align-center items-center m-auto mb-10 gap-4'>
        <details className="collapse bg-base-100 border border-base-300" name="my-accordion-det-1" open>
          <summary className="collapse-title font-semibold">How do I create an account?</summary>
          <div className="collapse-content text-sm">Click the "Sign Up" button in the top right corner and follow the registration process.</div>
        </details>
        <details className="collapse bg-base-100 border border-base-300" name="my-accordion-det-1">
          <summary className="collapse-title font-semibold">I forgot my password. What should I do?</summary>
          <div className="collapse-content text-sm">Click on "Forgot Password" on the login page and follow the instructions sent to your email.</div>
        </details>
        <details className="collapse bg-base-100 border border-base-300" name="my-accordion-det-1">
          <summary className="collapse-title font-semibold">How do I update my profile information?</summary>
          <div className="collapse-content text-sm">Go to "My Account" settings and select "Edit Profile" to make changes.</div>
        </details>
      </div>
    </div>
  )
}

export default Home