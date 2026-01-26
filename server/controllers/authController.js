import mongoose from "mongoose";
import Candidate from "../schema/candidateSchema.js";
import Company from "../schema/companySchema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const registerCandidate = async (request, response) => {
    const { name, email, password, skills } = request.body;

    try {
        const existingUser = await Candidate.findOne({ email: email });
        if (existingUser) {
            return response.status(400).json({
                message: "user already exists",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const candidate = new Candidate({
            name: name,
            email: email,
            password: hashedPassword,
            skills: skills,
        });

        
        const savedUser = await candidate.save();

        if (!savedUser) return response.status(400).json({
            message: "user not saved",
        });

        const token = jwt.sign({ id: savedUser._id, email: email, role: "candidate" }, process.env.JWT_SECRET, { expiresIn: '7d' });

        return response.status(201).json({
            message: "user saved successfully",
            token: token,
            details: savedUser,
        });

    } catch (err) {
        response.status(500).json({
            message: "server error",
            error: err,
        });
    }
}

export const registerCompany = async (request, response) => {
    const {  companyName, email, password, domain } = request.body;
    try {
        const existingCompany = await Company.findOne({ email: email });
        if (existingCompany) {
            return response.status(400).json({
                message: "company already exists",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        
        const company = new Company({
            companyName: companyName,
            email: email,
            password: hashedPassword,
            domain: domain,
        });

        

        const savedCompany = await company.save();

        if (!savedCompany) return response.status(400).json({
            message: "company not saved",
        });
        const token = jwt.sign({ id: savedCompany._id, email: email, role: "company" }, process.env.JWT_SECRET, { expiresIn: '7d' });
        return response.status(201).json({
            message: "company saved successfully",
            token: token,
            details: savedCompany,
        });

    } catch (error) {
        response.status(500).json({
            message: "server error",
            err: error,
        });
    }
};
export const loginCandidate = async (request, response) => {
    const { email, password } = request.body;
    try {
        const existingUser = await Candidate.findOne({ email: email });
        if (!existingUser) {
            return response.status(400).json({
                message: "user does not exist",
            });
        }
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) {
            return response.status(400).json({
                message: "invalid credentials",
            });
        }
        const token = jwt.sign({ id: existingUser._id, email: email, role: "candidate" }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return response.status(200).json({
            message: "login successful",
            token: token,
            details: existingUser,
        });
    } catch (err) {
        response.status(500).json({
            message: "server error",
            error: err
        });
    }
};
export const loginCompany = async (request, response) => {
    console.log("Login Company Request Body:", request.body);
    const { email, password } = request.body;
    try {
        const existingCompany = await Company.findOne({ email: email });
        if (!existingCompany) {
            return response.status(400).json({
                message: "company does not exist",
            });
        }
        const isPasswordCorrect = await bcrypt.compare(password, existingCompany.password);
        if (!isPasswordCorrect) {
            return response.status(400).json({
                message: "invalid credentials",
            });
        }
        const token = jwt.sign({ id: existingCompany._id, email: email, role: "company" }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return response.status(200).json({
            message: "login successful",
            token: token,
            details: existingCompany,
        });
    } catch (error) {
        console.log("JWT Verify Error:", error);
        response.status(500).json({
            message: "server error",
            error: error
        });
    }
};
