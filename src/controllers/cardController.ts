import { Request, Response } from "express";
import * as cardService from "../services/cardService.js";

export async function createNewCard(req: Request, res: Response) {
    const { employeeId, type: cardType } = req.body;

    const cardData = await cardService.createNewCard(employeeId, cardType);

    res.status(201).send("created");
}

export async function activateCard(req: Request, res: Response) {
    const { id } = req.params;
    const { securityCode, password } = req.body;
    const cardId: number = parseInt(id);

    await cardService.activateCard(cardId, securityCode, password);

    res.sendStatus(200);
}

export async function getCardBalance(req: Request, res: Response) {
    const { id } = req.params;
    const cardId: number = parseInt(id);
    const balance = await cardService.calcBalance(cardId);

    res.status(200).send(balance);
}

export async function blockCard(req: Request, res: Response) {
    const { id } = req.params;
    const { password } = req.body;
    const cardId: number = parseInt(id);

    await cardService.blockCard(cardId, password);

    res.sendStatus(200);
}

export async function unblockCard(req: Request, res: Response) {
    const { id } = req.params;
    const { password } = req.body;
    const cardId: number = parseInt(id);

    await cardService.unblockCard(cardId, password);

    res.sendStatus(200);
}


