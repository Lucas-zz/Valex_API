import * as businessRepository from "../repositories/businessRepository.js";

export async function findByBusinessId(businessId: number, cardType: string) {
    const businessData = await businessRepository.findById(businessId);

    if (!businessData) {
        throw { type: "not_found", message: "business not found" }
    } else if (businessData.type !== cardType) {
        throw { type: "bad_request", message: "business and card types does not match" }
    }

    return businessData;
}