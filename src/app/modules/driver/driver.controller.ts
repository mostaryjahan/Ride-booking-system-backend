import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import httpStatus from "http-status-codes";
import { DriverService } from "./driver.service";
import { sendResponse } from "../../utils/sendResponse";
import AppError from "../../errorHelpers/AppError";
import { UserServices } from "../user/user.service";
import { Role } from "../user/user.interface";


const updateAvailability = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const driverId = req.params.id;
  const payload = req.body;
  const decodedToken = req.user;

  if (!decodedToken) throw new AppError(httpStatus.UNAUTHORIZED, "Unauthorized");

  const updatedDriver = await DriverService.setAvailability(driverId, payload, decodedToken);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Driver availability updated successfully",
    data: updatedDriver,
  });
});


const getDriverProfile = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const driverId = req.params.id;

  const driver = await DriverService.getDriverById(driverId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Driver profile retrieved successfully",
    data: driver,
  });
});

//update status
const updateRideStatus = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const driverId = req.params.id;
  const payload = req.body;
  const decodedToken = req.user;

  if (!decodedToken) throw new AppError(httpStatus.UNAUTHORIZED, "Unauthorized");

  if (!payload.rideId || !payload.status) {
    throw new AppError(httpStatus.BAD_REQUEST, "rideId and status are required");
  }
  const updatedRide = await DriverService.updateRideStatus(driverId, payload, decodedToken);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Ride status updated successfully",
    data: updatedRide,
  });
});


const getRideHistory = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const driverId = req.params.id;

  const rides = await DriverService.getDriverRideHistory(driverId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Driver ride history retrieved successfully",
    data: rides,
  });
});


// block driver
const blockDriverController  = catchAsync(async (req: Request, res: Response) => {
  const userId = req.params.id;
  const verifiedToken = req.user;
  if (!verifiedToken) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized');
  }

  const { isBlock } = req.body;
  const user = await UserServices.blockUser(userId, isBlock, verifiedToken);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: `User ${isBlock === 'BLOCK' ? 'blocked' : 'unblocked'} successfully`,
    data: user,
  });
});

export const DriverController = {
  updateAvailability,
  getDriverProfile,
  getRideHistory,
  updateRideStatus,
  blockDriverController
};
