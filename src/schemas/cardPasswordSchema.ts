import joi from "joi";

const cardPasswordPattern = /^[0-9]{4}$/;

const cardPasswordSchema = joi.object({
    password: joi.string().pattern(cardPasswordPattern).required(),
});

export default cardPasswordSchema;