import * as companyRepository from "../repositories/companyRepository.js";

export async function findByApiKey(apiKey: string) {
    const companyData = await companyRepository.findByApiKey(apiKey);

    if (!companyData) {
        throw { type: "unauthorized", message: "Company's API Key not found" }
    }

    return companyData;
}