"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = require("express");
const user_validation_1 = require("./user.validation");
const user_controller_1 = require("./user.controller");
const validateRequest_1 = require("../../middlewares/validateRequest");
const checkAuth_1 = require("../../middlewares/checkAuth");
const user_interface_1 = require("./user.interface");
const router = (0, express_1.Router)();
router.post("/register", (0, validateRequest_1.validateRequest)(user_validation_1.createUserZodSchema), user_controller_1.UserControllers.createUser);
// router.get(
//   "/",
//   checkAuth(Role.ADMIN),
//   UserControllers.getAllUser
// );
router.patch('/:id', (0, validateRequest_1.validateRequest)(user_validation_1.updateUserZodSchema), (0, checkAuth_1.checkAuth)(user_interface_1.Role.ADMIN), user_controller_1.UserControllers.updateUser);
// router.patch('/block/:id', validateRequest(z.object({ isBlock: z.enum(['BLOCK', 'UNBLOCK'], { message: 'Invalid block status' }) })), checkAuth(Role.ADMIN), UserControllers.blockUser);
// router.patch('/approve/:id', validateRequest(approveDriverZodSchema), checkAuth(Role.ADMIN), UserControllers.approveDriver);
exports.UserRoutes = router;
