import { Request, Response, NextFunction } from "express";
import * as companyService from "../services/companyService.js";

export async function validateApiKey(req: Request, res: Response, next: NextFunction) {
    const apiKey = req.headers["x-api-key"] as string;

    if (!apiKey) {
        throw { type: "bad_request", message: "API key missing" }
    }

    const companyData = await companyService.findByApiKey(apiKey);

    res.locals.company = companyData;
    next();
}
