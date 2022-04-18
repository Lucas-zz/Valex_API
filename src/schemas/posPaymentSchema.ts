import joi from "joi";

const cardPasswordPattern = /^[0-9]{4}$/;

const posPaymentSchema = joi.object({
    cardId: joi.number().required(),
    password: joi.string().pattern(cardPasswordPattern).required(),
    businessId: joi.number().required(),
    amount: joi.number().required()
});

export default posPaymentSchema;