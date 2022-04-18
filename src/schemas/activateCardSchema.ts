import joi from "joi";

const cardPasswordPattern = /^[0-9]{4}$/

const activateCardSchema = joi.object({
    securityCode: joi.string().required(),
    password: joi.string().pattern(cardPasswordPattern).required(),
});

export default activateCardSchema;