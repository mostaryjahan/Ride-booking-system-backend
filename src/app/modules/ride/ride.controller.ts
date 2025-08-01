import { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { RideService } from './ride.service';
import httpStatus from 'http-status';
import { sendResponse } from '../../utils/sendResponse';

const createRide = catchAsync(async (req: Request, res: Response) => {
  const result = await RideService.createRide(req.body, req.user?._id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Ride created successfully',
    data: result,
  });
});

const cancelRide = catchAsync(async (req: Request, res: Response) => {
  const result = await RideService.cancelRide(req.params.id, req.user?._id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Ride cancelled successfully',
    data: result,
  });
});

const updateRideStatus = catchAsync(async (req: Request, res: Response) => {
  const result = await RideService.updateRideStatus(req.params.id, req.user?._id, req.body.status);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Ride status updated successfully',
    data: result,
  });
});

const getMyRides = catchAsync(async (req: Request, res: Response) => {
  const result = await RideService.getMyRides(req.user?._id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'My rides fetched successfully',
    data: result,
  });
});

const getAllRides = catchAsync(async (_req: Request, res: Response) => {
  const result = await RideService.getAllRides();
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'All rides fetched successfully',
    data: result,
  });
});

const getDriverEarnings = catchAsync(async (req: Request, res: Response) => {
  const result = await RideService.getDriverEarnings(req.user?._id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Earnings fetched successfully',
    data: result,
  });
});

export const RideController = {
  createRide,
  cancelRide,
  updateRideStatus,
  getMyRides,
  getAllRides,
  getDriverEarnings,
};