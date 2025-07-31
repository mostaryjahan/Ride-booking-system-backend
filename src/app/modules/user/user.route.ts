import { Router } from "express";
import { createUserZodSchema } from "./user.validation";

import { UserControllers } from "./user.controller";
import { validateRequest } from "../../middlewares/validaterequest";

const router = Router();

router.post("/register", validateRequest(createUserZodSchema), UserControllers.createUser);

export const UserRoutes = router;