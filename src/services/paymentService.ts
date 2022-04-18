import * as cardService from "./cardService.js";
import * as paymentRepository from "../repositories/paymentRepository.js";
import * as businessService from "./businessService.js";

export async function posPayment(cardId: number, password: string, businessId: number, amount: number) {
    const cardData = await cardService.findByCardId(cardId);

    if (cardData.isVirtual) {
        throw { type: "bad_request", message: "cannot make POS payments with virtual card" }
    } else if (cardData.isBlocked) {
        throw { type: "forbidden", message: "blocked card" }
    }

    cardService.checkPassword(password, cardData.password);
    cardService.isExpired(cardData.expirationDate);
    await businessService.findByBusinessId(businessId, cardData.type);

    if (amount <= 0) {
        throw { type: "bad_request", message: "payment value must be higher than zero" }
    }

    const cardInfo = await cardService.calcBalance(cardId);

    if (cardInfo.balance < amount) {
        throw { type: "bad_request", message: "insuficient balance" }
    }
    await paymentRepository.insert({ cardId, businessId, amount });

}

export async function onlinePayment(cardHolderName: string, number: string, securityCode: string, expirationDate: string, businessId: number, amount: number) {
    const cardData = await cardService.findByCardDetails(number, cardHolderName, expirationDate);

    if (cardData.isVirtual) {
        cardData.id = cardData.originalCardId;
    } else if (cardData.isBlocked) {
        throw { type: "forbidden", message: "blocked card" }
    }

    cardService.isExpired(cardData.expirationDate);
    await businessService.findByBusinessId(businessId, cardData.type);

    if (amount <= 0) {
        throw { type: "bad_request", message: "payment value must be higher than zero" }
    }

    const cardInfo = await cardService.calcBalance(cardData.id);

    if (cardInfo.balance < amount) {
        throw { type: "bad_request", message: "insuficient balance" }
    }

    await paymentRepository.insert({ cardId: cardData.id, businessId, amount })
}