import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";
import dayjs from "dayjs";

import * as cardRepository from "../repositories/cardRepository.js";

export function formatCardHolderName(employeeName: string) {
    const employeeFullName = employeeName.split(" ");
    const cardHolderName = [];

    employeeFullName.map((name: string, i: number) => {
        if (i === 0 || i === employeeFullName.length - 1) {
            cardHolderName.push(name);
        } else if (name.length > 2) {
            cardHolderName.push(name[0]);
        }
    });

    let formatedCardHolderName = cardHolderName.join(" ").toUpperCase();

    return formatedCardHolderName;
}

export function generateCardInfo(employeeId: number, cardHolderName: string, type: cardRepository.TransactionTypes): cardRepository.CardInsertData {
    const CVV = faker.finance.creditCardCVV();

    console.log(CVV);

    const newCard = {
        employeeId,
        number: faker.finance.creditCardNumber("MasterCard"),
        cardholderName: cardHolderName,
        securityCode: bcrypt.hashSync(CVV, 10),
        expirationDate: dayjs(Date.now()).add(5, "year").format("MM/YY"),
        password: null,
        isVirtual: false,
        originalCardId: null,
        isBlocked: true,
        type
    }
    return newCard;
}