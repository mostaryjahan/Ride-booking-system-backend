import { Router } from "express";
import { approveDriverZodSchema, createUserZodSchema, updateUserZodSchema } from "./user.validation";

import { UserControllers } from "./user.controller";
import { validateRequest } from "../../middlewares/validaterequest";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "./user.interface";
import z from "zod";

const router = Router();

router.post("/register", validateRequest(createUserZodSchema), UserControllers.createUser);

router.get(
  "/",
  checkAuth(Role.ADMIN),
  UserControllers.getAllUser
);


router.patch('/:id', validateRequest(updateUserZodSchema), checkAuth(Role.ADMIN), UserControllers.updateUser);


// router.patch('/block/:id', validateRequest(z.object({ isBlock: z.enum(['BLOCK', 'UNBLOCK'], { message: 'Invalid block status' }) })), checkAuth(Role.ADMIN), UserControllers.blockUser);



router.patch('/approve/:id', validateRequest(approveDriverZodSchema), checkAuth(Role.ADMIN), UserControllers.approveDriver);

export const UserRoutes = router;