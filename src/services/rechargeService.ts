import * as rechargeRepository from "../repositories/rechargeRepository.js";
import * as cardService from "./cardService.js";

export async function rechargeCard(cardId: number, rechargeAmount: number) {
    const cardData = await cardService.findByCardId(cardId);

    if (cardData.isVirtual) {
        throw { type: "bad_request", message: "virtual cards cannot be recharged" }
    } else if (rechargeAmount <= 0) {
        throw { type: "unprocessable_entity", message: "recharge value must be higher than zero" }
    }

    const rechargeData = { cardId, amount: rechargeAmount }

    await rechargeRepository.insert(rechargeData);
}