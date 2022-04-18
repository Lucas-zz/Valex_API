import { NextFunction, Request, Response } from "express";
import { Schema } from 'joi';

export function validateSchemaMiddleware(schema: Schema) {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req.body);
        if (error) {
            throw { type: "unprocessable_entity", message: "invalid schema" }
        }
        next();
    }
}