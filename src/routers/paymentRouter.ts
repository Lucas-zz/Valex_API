import { Router } from "express";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware.js";

import * as paymentController from "../controllers/paymentController.js";
import * as schemas from "../schemas/index.js";

const paymentRouter: Router = Router();

paymentRouter.post("/payment/pos", validateSchemaMiddleware(schemas.posPaymentSchema), paymentController.posPayment);
paymentRouter.post("/payment/online", validateSchemaMiddleware(schemas.onlinePaymentSchema), paymentController.onlinePayment);

export default paymentRouter;