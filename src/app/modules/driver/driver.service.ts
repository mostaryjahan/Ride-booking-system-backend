import { User } from "../user/user.model"; // User মডেল
import { IDriver, Role } from "../user/user.interface";
import AppError from "../../errorHelpers/AppError";
import httpStatus from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";
import { Ride } from "../ride/ride.model";
import { IRide } from "../ride/ride.interface";

interface IUpdateAvailability {
  isOnline: boolean;
}



const setAvailability = async (
  driverId: string,
  payload: IUpdateAvailability,
  decodedToken: JwtPayload
) => {
  if (decodedToken._id !== driverId && decodedToken.role !== Role.ADMIN) {
    throw new AppError(httpStatus.FORBIDDEN, "Not authorized to update availability");
  }


  const driver = await User.findOne({ _id: driverId, role: Role.DRIVER });

  if (!driver) {
    throw new AppError(httpStatus.NOT_FOUND, "Driver not found");
  }

  driver.isOnline = payload.isOnline;
  await driver.save();

  return driver;
};

// update status
const updateRideStatus = async (
  driverId: string,
  payload: IRide,
  decodedToken: JwtPayload
) => {
  if (decodedToken._id !== driverId && decodedToken.role !== Role.ADMIN) {
    throw new AppError(httpStatus.FORBIDDEN, "Not authorized to update ride status");
  }

 
  const ride = await Ride.findById(payload._id);

  if (!ride) {
    throw new AppError(httpStatus.NOT_FOUND, "Ride not found");
  }


  ride.status = payload.status;

  await ride.save();

  return ride;
};


const getDriverById = async (driverId: string) => {
  const driver = await User.findOne({ _id: driverId, role: Role.DRIVER });

  if (!driver) {
    throw new AppError(httpStatus.NOT_FOUND, "Driver not found");
  }

  return driver;
};

//driver history
const getDriverRideHistory = async (driverId: string) => {
  const driver = await User.findOne({ _id: driverId, role: Role.DRIVER }).populate("rides");

  if (!driver) {
    throw new AppError(httpStatus.NOT_FOUND, "Driver not found");
  }

  return driver.rides;
};



export const DriverService = {
  setAvailability,
  getDriverById,
  getDriverRideHistory,
  updateRideStatus
};
