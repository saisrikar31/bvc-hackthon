import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
const AuthEmployer = () => {

    const navigate = useNavigate();

    const [loginActive, setLoginActive] = useState(true);
    const [registerActive, setRegisterActive] = useState(false);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [companyDomain, setCompanyDomain] = useState("");

    const loginEmployer = async () => {
        console.log("Logging in employer with email:", email, "and password:", password);
        const response = await axios.post('http://localhost:8000/api/auth/login-company', {
            email: email,
            password: password
        });

        localStorage.setItem("Token", response.data.token);
        console.log(localStorage.getItem("Token"));
        navigate('/create-job');

    }

    const registerEmployer = async () => {
        console.log("Registering employer with name:", name, "email:", email, "password:", password, "companyDomain:", companyDomain);
        const response = await axios.post('http://localhost:8000/api/auth/register-company', {
            companyName: name,
            email: email,
            password: password,
            domain: companyDomain,
        });

        console.log("Registration response:", response.data);
        localStorage.setItem("Token", response.data.token);
        if (response.status === 201) {
            alert("Registration successful!");
        } else {
            alert("Registration failed. Please try again.");
        }
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
                    <input class="join-item btn" type="radio" name="options" aria-label="Login Employer" defaultChecked onClick={loginActiveHandler} />
                    <input class="join-item btn" type="radio" name="options" aria-label="Register Employer" onClick={registerActiveHandler} />
                </div>

                <br />

                <div className={loginActive ? "visible" : "hidden"}>

                    <div className='flex flex-col gap-2'>
                        <label className="label">Email</label>
                        <input type="email" className="input" placeholder="Email" onChange={(e) => {setEmail(e.target.value)}} />

                        <label className="label">Password</label>
                        <input type="password" className="input" placeholder="Password" onChange={(e) => {setPassword(e.target.value)}} />
                    </div>
                    <button className="btn btn-neutral mt-4 w-[100%]" onClick={loginEmployer}>Login</button>

                </div>

                <div className={registerActive ? "visible" : "hidden"}>



                    <div className='flex flex-col gap-2'>

                        <label className="label">Name</label>
                        <input type="text" className="input" placeholder="Name" onChange={(e) => setName(e.target.value)} />

                        <label className="label">Email</label>
                        <input type="email" className="input" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />

                        <label className="label">Password</label>
                        <input type="password" className="input" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />

                        <label className="label">Company Domain</label>
                        <input type="text" className="input" placeholder="Company Domain" onChange={(e) => setCompanyDomain(e.target.value)} />
                    </div>
                    <button className="btn btn-neutral mt-4 w-full" onClick={registerEmployer}>Register</button>
                </div>
            </fieldset>
        </div>
    )
}

export default AuthEmployer;
