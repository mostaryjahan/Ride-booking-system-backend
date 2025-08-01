import AppError from "../../errorHelpers/AppError";
import { IAuthProvider, IDriver, IsBlock, IUser, Role } from "./user.interface";
import { User } from "./user.model";
import httpStatus from "http-status-codes";
import bcryptjs from "bcryptjs";
import { envVars } from "../../config/env";
import { JwtPayload } from "jsonwebtoken";

//create new user
const createUser = async (payload: Partial<IUser>) => {
  const { email, password, ...rest } = payload;

  const isUserExist = await User.findOne({ email });

  if (isUserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "User Already Exist");
  }

  const hashedPassword = await bcryptjs.hash(
    password as string,
    Number(envVars.BCRYPT_SALT_ROUND)
  );

  const authProvider: IAuthProvider = {
    provider: "credentials",
    providerId: email as string,
  };

  const user = await User.create({
    email,
    password: hashedPassword,
    isVerified: payload.role=== Role.DRIVER ? false: true,
    auths: [authProvider],
    ...rest,
  });

  return user;
};

// update user
const updateUser = async (userId: string, payload: Partial<IUser & IDriver>, decodedToken: JwtPayload) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  // Restrict role changes to admins
  if (payload.role) {
    if (decodedToken.role !== Role.ADMIN) {
      throw new AppError(httpStatus.FORBIDDEN, 'Only admins can change roles');
    }
  }

  // Restrict sensitive fields to admins
  if (payload.isDeleted || payload.isVerified || payload.isBlock || payload.isApproved) {
    if (decodedToken.role !== Role.ADMIN) {
      throw new AppError(httpStatus.FORBIDDEN, 'Only admins can modify these fields');
    }
  }

  // Restrict non-owners from updating personal fields
  if (
    (payload.name || payload.email || payload.password || payload.phone || payload.address || payload.vehicleInfo) &&
    decodedToken._id !== userId &&
    decodedToken.role !== Role.ADMIN
  ) {
    throw new AppError(httpStatus.FORBIDDEN, 'Cannot update another user’s personal details');
  }

  // Check email uniqueness
  if (payload.email && payload.email !== user.email) {
    const emailExists = await User.findOne({ email: payload.email });
    if (emailExists) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Email already in use');
    }
  }

  // Hash password if provided
  if (payload.password) {
    payload.password = await bcryptjs.hash(payload.password, Number(envVars.BCRYPT_SALT_ROUND));
  }

  const updatedUser = await User.findByIdAndUpdate(userId, payload, {
    new: true,
    runValidators: true,
  });

  return updatedUser;
};
// get all users
const getAllUser = async () => {
  const users = await User.find({});
  return {
    data: users,
  };
};

// blocked user
const blockUser = async (userId: string, isBlock: IsBlock, decodedToken: JwtPayload) => {
  if (decodedToken.role !== Role.ADMIN) {
    throw new AppError(httpStatus.FORBIDDEN, 'Only admins can block/unblock users');
  }

  const user = await User.findById(userId);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  if (user.role === Role.ADMIN) {
    throw new AppError(httpStatus.FORBIDDEN, 'Cannot block/unblock an admin');
  }

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { isBlock },
    { new: true, runValidators: true }
  );

  return updatedUser;
};


// approve driver
const approveDriver = async (userId: string, isApproved: boolean, decodedToken: JwtPayload) => {
  if (decodedToken.role !== Role.ADMIN) {
    throw new AppError(httpStatus.FORBIDDEN, 'Only admins can approve/reject drivers');
  }

  const user = await User.findById(userId);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  if (user.role !== Role.DRIVER) {
    throw new AppError(httpStatus.BAD_REQUEST, 'User is not a driver');
  }

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { isApproved },
    { new: true, runValidators: true }
  );

  return updatedUser;
};

export const UserServices = {
  createUser,
  getAllUser,
  updateUser,
  blockUser,
  approveDriver
};
