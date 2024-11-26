import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export interface CustomRequest extends Request {
    userId?: string;
}

export const authMiddleware = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.headers["authorization"];
        if (!token) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }

        const bearerToken = token.split(" ")[1];
        if (!bearerToken) {
            res.status(401).json({ message: "Token missing in authorization header" });
            return;
        }

        const decoded = jwt.verify(bearerToken, process.env.JWT_SECRET || "secret") as JwtPayload;
        req.userId = decoded.id;
        next();
    } catch (error) {
        console.error("Error in auth middleware", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
