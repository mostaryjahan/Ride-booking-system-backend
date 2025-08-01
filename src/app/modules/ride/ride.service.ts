import { Ride } from './ride.model';
import { IRide, RideStatus } from '../../interfaces/ride.interface';
import { User } from '../user/user.model';
import { AppError } from '../../utils/error';
import { Role } from '../user/user.interface';


// Valid status transitions
const statusTransitions: Record<RideStatus, RideStatus[]> = {
  requested: ['accepted', 'rejected', 'canceled'],
  accepted: ['picked_up', 'canceled'],
  picked_up: ['in_transit'],
  in_transit: ['completed'],
  completed: [],
  canceled: [],
  rejected: [],
};

export const createRide = async (payload: Partial<IRide>, riderId: string) => {
  const rider = await User.findById(riderId);
  if (!rider || rider.isBlock === 'BLOCK') throw new AppError('Invalid or blocked rider', 403);

  // Check for active rides
  const activeRide = await Ride.findOne({
    riderId,
    status: { $in: ['requested', 'accepted', 'picked_up', 'in_transit'] },
  });
  if (activeRide) throw new AppError('Rider has an active ride', 400);

  const ride = await Ride.create({ ...payload, riderId });
  await User.findByIdAndUpdate(riderId, { $push: { rides: ride._id } });
  return ride;
};

export const cancelRide = async (rideId: string, riderId: string) => {
  const ride = await Ride.findById(rideId);
  if (!ride) throw new AppError('Ride not found', 404);
  if (ride.riderId.toString() !== riderId) throw new AppError('Unauthorized', 403);
  if (!statusTransitions[ride.status].includes('canceled')) {
    throw new AppError('Ride cannot be canceled at this stage', 400);
  }

  ride.status = 'canceled';
  await ride.save();
  return ride;
};

export const updateRideStatus = async (rideId: string, driverId: string, status: RideStatus) => {
  const ride = await Ride.findById(rideId);
  if (!ride) throw new AppError('Ride not found', 404);

  const driver = await User.findById(driverId);
  if (!driver || driver.role !== Role.DRIVER || driver.isBlock === 'BLOCK') {
    throw new AppError('Invalid or blocked driver', 403);
  }
  if (!(driver as any).isApproved) throw new AppError('Driver not approved', 403);
  if (!(driver as any).isOnline) throw new AppError('Driver is offline', 403);

  if (!statusTransitions[ride.status].includes(status)) {
    throw new AppError(`Cannot transition from ${ride.status} to ${status}`, 400);
  }

  if (status === 'accepted') {
    if (ride.driverId) throw new AppError('Ride already assigned', 400);
    ride.driverId = driverId;
  } else if (ride.driverId?.toString() !== driverId) {
    throw new AppError('Unauthorized', 403);
  }

  ride.status = status;
  if (status === 'completed') ride.fare = ride.fare || 50; // Simplified fare
  await ride.save();
  return ride;
};

export const getMyRides = async (userId: string) => {
  return await Ride.find({
    $or: [{ riderId: userId }, { driverId: userId }],
  }).populate('riderId driverId');
};

export const getAllRides = async () => {
  return await Ride.find().populate('riderId driverId');
};

export const getDriverEarnings = async (driverId: string) => {
  const driver = await User.findById(driverId);
  if (!driver || driver.role !== Role.DRIVER) throw new AppError('Invalid driver', 403);

  const rides = await Ride.find({ driverId, status: 'completed' });
  const totalEarnings = rides.reduce((sum, ride) => sum + ride.fare, 0);
  return { rides, totalEarnings };
};

export const RideService = {
  createRide,
  cancelRide,
  updateRideStatus,
  getMyRides,
  getAllRides,
  getDriverEarnings,
};