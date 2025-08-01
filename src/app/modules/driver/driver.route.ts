import { Router } from "express";
import { DriverController } from "./driver.controller";

import { Role } from "../user/user.interface";
import { checkAuth } from "../../middlewares/checkAuth";
import { validateRequest } from "../../middlewares/validaterequest";
import z from "zod";



const router = Router();

router.patch(
  "/:id/availability",
  validateRequest,
  checkAuth(Role.DRIVER, Role.ADMIN),
  DriverController.updateAvailability
);


router.get(
  "/:id/profile",
  validateRequest,
  checkAuth(Role.DRIVER, Role.ADMIN),
  DriverController.getDriverProfile
);


router.get(
  "/:id/rides",
  validateRequest,
  checkAuth(Role.DRIVER, Role.ADMIN),
  DriverController.getRideHistory
);

router.patch(
  "/:id/rides/status",
  validateRequest,
  checkAuth(Role.DRIVER, Role.ADMIN),
  DriverController.updateRideStatus
);

router.patch(
  "/block/:id",
  checkAuth(Role.ADMIN),
  validateRequest(z.object({ isBlock: z.enum(['BLOCK', 'UNBLOCK']) })),
  DriverController.blockDriverController
);

export const DriverRoutes = router;
