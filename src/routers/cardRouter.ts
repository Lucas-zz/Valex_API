import { Router } from "express";
import * as schemas from "../schemas/index.js";
import * as cardController from "../controllers/cardController.js";
import * as rechargeController from "../controllers/rechargeController.js";
import { validateApiKey } from "../middlewares/validateApiKeyMiddleware.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware.js";

const cardRouter: Router = Router();

cardRouter.post("/card/create", validateApiKey, validateSchemaMiddleware(schemas.cardSchema), cardController.createNewCard);
cardRouter.get("/cards/:id/balance", cardController.getCardBalance);
cardRouter.put("/cards/:id/activate", validateSchemaMiddleware(schemas.activateCardSchema), cardController.activateCard);
cardRouter.post("/cards/:id/recharge", validateApiKey, validateSchemaMiddleware(schemas.rechargeSchema), rechargeController.rechargeCard);
cardRouter.put("/cards/:id/block", validateSchemaMiddleware(schemas.cardPasswordSchema), cardController.blockCard);
cardRouter.put("/cards/:id/unblock", validateSchemaMiddleware(schemas.cardPasswordSchema), cardController.unblockCard);

export default cardRouter;