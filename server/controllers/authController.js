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
        const token = jwt.sign({ email: email, role: "candidate" }, process.env.JWT_SECRET, { expiresIn: '1h' });

        const candidate = new Candidate({
            name: name,
            email: email,
            password: hashedPassword,
            skills: [skills]
        });

        const savedUser = await candidate.save();

        if (!savedUser) return response.status(400).json({
            message: "user not saved",
        });

        return response.status(201).json({
            message: "user saved successfully",
            token: token,
            details: savedUser,
        });

    } catch (err) {
        response.status(402).json({
            message: "server error",
            error: err
        });
    }
}

export const registerCompany = async (request, response) => {
    const {  companyName, email, password } = request.body;
    try {
        const existingCompany = await Company.findOne({ email: email });
        if (existingCompany) {
            return response.status(400).json({
                message: "company already exists",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const token = jwt.sign({ email: email, role: "company" }, process.env.JWT_SECRET, { expiresIn: '1h' });

        const company = new Company({
            companyName: companyName,
            email: email,
            password: hashedPassword
        });

        const savedCompany = await company.save();

        if (!savedCompany) return response.status(400).json({
            message: "company not saved",
        });

        return response.status(201).json({
            message: "company saved successfully",
            token: token,
            details: savedCompany,
        });

    } catch (err) {
        response.status(402).json({
            message: "server error",
            error: err
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
        const token = jwt.sign({ email: email, role: "candidate" }, process.env.JWT_SECRET, { expiresIn: '1h' });
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
export const loginCompany = async () => {
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
        const token = jwt.sign({ email: email, role: "company" }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return response.status(200).json({
            message: "login successful",
            token: token,
            details: existingCompany,
        });
    } catch (err) {
        response.status(500).json({
            message: "server error",
            error: err
        });
    }
};
