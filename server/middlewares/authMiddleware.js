import express from "express";
// import "dotenv/config";
import jwt from "jsonwebtoken";

export const isAuthenticated = (request, response, next) => {
    const authHeader = request.headers.authorization;
    console.log(authHeader);
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return response.status(401).json({
            message: "Authorization header missing or malformed",
        });
    }
    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        request.user = decoded;
        next();
    } catch (error) {
        return response.status(401).json({
            message: "Invalid or expired token",
            error: error,
        });
    }
};

export const isCompany = (request, response, next) => {
    if (request.user && request.user.role === "company") {
        next();
    } else {
        return response.status(403).json({
            message: "Access denied. Company role required.",
        });
    }       
};

export const isCandidate = (request, response, next) => {
    if (request.user && request.user.role === "candidate") {
        next();
    } else {
        return response.status(403).json({
            message: "Access denied. Candidate role required.",
        });
    }       
};
