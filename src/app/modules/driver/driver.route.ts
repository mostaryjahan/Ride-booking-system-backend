import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { DriverController } from "./driver.controller";
import { createDriverZodSchema } from "./driver.validation";
import { validateRequest } from "../../middlewares/validateRequest";


const router = Router();

router.post("/apply-driver", checkAuth(Role.RIDER), DriverController.applyToBeDriver, validateRequest(createDriverZodSchema));
router.get("/rides-available", checkAuth(Role.DRIVER), DriverController.getAvailableRides);
router.patch("/rides/:id/accept", checkAuth(Role.DRIVER), DriverController.acceptRide);
router.patch("/rides/:id/reject", checkAuth(Role.DRIVER), DriverController.rejectRide);
router.patch("/rides/:id/status", checkAuth(Role.DRIVER), DriverController.updateRideStatus);
router.get("/earning-history", checkAuth(Role.DRIVER), DriverController.getRideHistory);

export const DriverRoutes = router;