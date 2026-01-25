import mongoose from "mongoose";
import Candidate from "../schema/candidateSchema.js";
import jwt from "jsonwebtoken";

export const registerCandidate = async (request, response) => {
    const { name, email, password, skills } = request.body;

    // hashing and other stuff (last lo add chedham)

    try {
        const candidate = new Candidate({
            name: name,
            email: email,
            password: password,
            skills: [skills]
        });

        const savedUser = await candidate.save();

        if(!savedUser) return response.status(400).json({
            message: "user not saved"
        });

        return response.status(201).json({
            message: "user saved successfully",
            details: savedUser
        });

    } catch (err) {
        response.status(402).json({
            message: "server error",
            error: err
        });
    }
}
