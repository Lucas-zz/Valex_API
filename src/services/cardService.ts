import bcrypt from "bcrypt";
import dayjs from "dayjs";

import * as cardRepository from "../repositories/cardRepository.js";
import * as paymentRepository from "../repositories/paymentRepository.js";
import * as employeeRepository from "../repositories/employeeRepository.js";
import * as rechargeRepository from "../repositories/rechargeRepository.js";

import * as cardUtils from "../utils/cardUtils.js";
import * as cryptUtils from "../utils/cryptUtils.js";
import * as balanceUtils from "../utils/balanceUtils.js";

export async function createNewCard(employeeId: number, cardType: cardRepository.TransactionTypes) {
    const employeeData = await employeeRepository.findById(employeeId);
    if (!employeeData) {
        throw { type: "not_found", message: "employee not found" }
    }

    const employeeCard = await cardRepository.findByTypeAndEmployeeId(cardType, employeeId);
    if (employeeCard) {
        throw { type: "conflict", message: "card of the same type already exists" }
    }

    const cardHolderName = cardUtils.formatCardHolderName(employeeData.fullName);
    const newCard = cardUtils.generateCardInfo(employeeId, cardHolderName, cardType);

    await cardRepository.insert(newCard);
}

export async function activateCard(cardId: number, securityCode: string, password: string) {
    const cardData = await findByCardId(cardId);

    if (cardData.isVirtual) {
        throw { type: "bad_request", message: "virtual cards does not need to be activated" }
    } else if (cardData.password) {
        throw { type: "conflict", message: "card already activated" }
    } else if (!cryptUtils.decrypt(securityCode, cardData.securityCode)) {
        throw { type: "unauthorized", message: "security code does not match" }
    }

    isExpired(cardData.expirationDate);

    cardData.password = cryptUtils.encrypt(password);

    cardData.isBlocked = false;

    await cardRepository.update(cardId, cardData);
}

export async function calcBalance(cardId: number) {
    await findByCardId(cardId);

    const transactions = await paymentRepository.findByCardId(cardId);
    const recharges = await rechargeRepository.findByCardId(cardId);

    const balance = balanceUtils.calcBalance(recharges, transactions);

    return { balance, transactions, recharges }
}

export async function findByCardId(cardId: number) {
    const cardData: cardRepository.Card = await cardRepository.findById(cardId);

    if (!cardData) {
        throw { type: "not_found", message: "card not found" }
    }

    return cardData;
}

export async function findByCardDetails(number: string, cardHolderName: string, expirationDate: string) {
    const cardData: cardRepository.Card = await cardRepository.findByCardDetails(number, cardHolderName, expirationDate);

    if (!cardData) {
        throw { type: "not_found", message: "card not found" }
    }

    return cardData;
}

export function isExpired(date: string) {
    const dateFormat = date.split("/");

    const isExpired = dayjs(`${dateFormat[0]}/31/${dateFormat[1]}`).isBefore(dayjs(Date.now()));

    if (isExpired) {
        throw { type: "forbidden", message: "expired card" }
    }
}

export function checkPassword(password: string, encryptedPassword: string) {
    if (!bcrypt.compareSync(password, encryptedPassword)) {
        throw { type: "unauthorized", message: "password does not match" }
    }
}

export async function blockCard(cardId: number, password: string) {
    const cardData = await findByCardId(cardId);

    if (cardData.isBlocked) {
        throw { type: "bad_request", message: "card is already blocked" }
    }

    checkPassword(password, cardData.password);
    isExpired(cardData.expirationDate);

    cardData.isBlocked = true;

    await cardRepository.update(cardId, cardData);
}

export async function unblockCard(cardId: number, password: string) {
    const cardData = await findByCardId(cardId);

    if (!cardData.isBlocked) {
        throw { type: "bad_request", message: "card is already unblocked" }
    }

    checkPassword(password, cardData.password);
    isExpired(cardData.expirationDate);

    cardData.isBlocked = false;

    await cardRepository.update(cardId, cardData);
}