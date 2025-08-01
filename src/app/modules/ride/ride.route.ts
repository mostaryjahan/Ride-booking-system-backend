import { Router } from 'express';
import { RideController } from './ride.controller';

import { checkAuth } from '../../middlewares/checkAuth';

import { createRideZodSchema, updateRideStatusZodSchema } from './ride.validation';
import { validateRequest } from '../../middlewares/validaterequest';
import { Role } from '../user/user.interface';

const router = Router();

// Rider creates ride
router.post('/request', checkAuth(Role.RIDER), validateRequest(createRideZodSchema), RideController.createRide);

// Rider cancels ride
router.patch('/:id/cancel', checkAuth(Role.RIDER), RideController.cancelRide);

// Driver updates status
router.patch('/:id/status', checkAuth(Role.DRIVER), validateRequest(updateRideStatusZodSchema), RideController.updateRideStatus);

// Rider or Driver views own ride history
router.get('/me', checkAuth(Role.RIDER, Role.DRIVER), RideController.getMyRides);

// Admin views all rides
router.get('/', checkAuth(Role.ADMIN), RideController.getAllRides);

// Driver views earnings
router.get('/earnings', checkAuth(Role.DRIVER), RideController.getDriverEarnings);

export const RideRoutes = router;