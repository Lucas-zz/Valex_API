import joi from "joi";

const expirationDatePattern = /^[0-9]{2}\/[0-9]{4}$/;

const onlinePaymentSchema = joi.object({
    cardholderName: joi.string().required(),
    securityCode: joi.string().required(),
    expirationDate: joi.string().required(),
    number: joi.string().required(),
    businessId: joi.number().required(),
    amount: joi.number().required()
});

export default onlinePaymentSchema;