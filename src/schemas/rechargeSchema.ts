import joi from "joi";

const rechargeSchema = joi.object({
    amount: joi.number().required(),
});

export default rechargeSchema;