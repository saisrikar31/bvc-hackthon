import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const AuthJobSeeker = () => {

  const navigate = useNavigate();

    const [loginActive, setLoginActive] = useState(true);
    const [registerActive, setRegisterActive] = useState(false);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [skills, setSkills] = useState("");

    const [responseMessage, setResponseMessage] = useState("");

    const loginJobSeeker = async () => {
        console.log("Logging in job seeker with email:", email, "and password:", password);
        const response = await axios.post('http://localhost:8000/api/auth/login-candidate', {
            email: email,
            password: password
        });
        console.log("Login response:", response.data);
        localStorage.setItem("Token", response.data.token);
        setResponseMessage(response.data.message);
        console.log("Stored token:", localStorage.getItem("Token"));

        console.log("Response status:", response.status);

        if (response.status == 200) {
          navigate('/job-section');
        }
    }

    const registerJobSeeker = async () => {
        console.log("Registering job seeker with name:", name, "email:", email, "password:", password, "skills:", skills);
        const response = await axios.post('http://localhost:8000/api/auth/register-candidate', {
            name: name,
            email: email,
            password: password,
            skills: skills,
        });
        localStorage.setItem("Token", response.data.token);
        setResponseMessage(response.data.message);

      
    }

    const loginActiveHandler = () => {
        console.log("login clicked");
        setLoginActive(true);
        setRegisterActive(false);
    }

    const registerActiveHandler = () => {
        console.log("register clicked");
        setLoginActive(false);
        setRegisterActive(true);
    }


    return (
        <div className='flex justify-center items-center h-screen'>
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                <div class="join">
                    <input class="join-item btn" type="radio" name="options" aria-label="Login Job Seeker" defaultChecked onClick={loginActiveHandler} />
                    <input class="join-item btn" type="radio" name="options" aria-label="Register Job Seeker" onClick={registerActiveHandler} />
                </div>

                <br />

                <div className={loginActive ? "visible" : "hidden"}>

                    <div className='flex flex-col gap-2'>
                        <label className="label">Email</label>
                        <input type="email" className="input" placeholder="Email" onChange={(e) => {setEmail(e.target.value)}} />

                        <label className="label">Password</label>
                        <input type="password" className="input" placeholder="Password" onChange={(e) => {setPassword(e.target.value)}} />
                    </div>
                    <button className="btn btn-neutral mt-4 w-[100%]" onClick={loginJobSeeker}>Login</button>

                </div>

                <div className={registerActive ? "visible" : "hidden"}>



                    <div className='flex flex-col gap-2'>

                        <label className="label">Name</label>
                        <input type="text" className="input" placeholder="Name" onChange={(e) => setName(e.target.value)} />

                        <label className="label">Email</label>
                        <input type="email" className="input" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />

                        <label className="label">Password</label>
                        <input type="password" className="input" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />

                        <label className="label">Skills</label>
                        <input type="text" className="input" placeholder="Skills" onChange={(e) => setSkills(e.target.value)} />
                    </div>
                    <button className="btn btn-neutral mt-4 w-full" onClick={registerJobSeeker}>Register</button>
                </div>
                <p className='text-center text-red-400'>{responseMessage}</p>
            </fieldset>
        </div>
    )
}

export default AuthJobSeeker;
