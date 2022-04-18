import { Request, Response } from "express";
import * as paymentServices from "../services/paymentService.js";

export async function posPayment(req: Request, res: Response) {
    const { cardId, businessId, password, amount } = req.body;

    await paymentServices.posPayment(cardId, password, businessId, amount);

    res.sendStatus(200);
}

export async function onlinePayment(req: Request, res: Response) {
    const { securityCode, number, cardholderName, expirationDate, businessId, amount } = req.body;

    await paymentServices.onlinePayment(cardholderName, number, securityCode, expirationDate, businessId, amount);

    res.sendStatus(200);
}