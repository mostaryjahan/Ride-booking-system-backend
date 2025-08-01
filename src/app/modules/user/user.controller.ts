/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { UserServices } from "./user.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";
import AppError from "../../errorHelpers/AppError";

// create new user
const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await UserServices.createUser(req.body);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "User Created Successfully!",
      data: user,
    });
  }
);

// update user
const updateUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id;
    const verifiedToken = req.user;

      if (!verifiedToken) {
      return next(new AppError(401, "Unauthorized"));
    }

    const payload = req.body;

    const user = await UserServices.updateUser(userId, payload, verifiedToken);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User Updated Successfully",
      data: user,
    });
  }
);

// get all users
// const getAllUser = catchAsync(
//   async (req: Request, res: Response, next: NextFunction) => {
//     const result = await UserServices.getAllUser();
//     sendResponse(res, {
//       success: true,
//       statusCode: httpStatus.OK,
//       message: "All Users Retrieved Successfully",
//       data: result.data
//     });
//   }
// );

// blocked user
// const blockUser = catchAsync(async (req: Request, res: Response) => {
//   const userId = req.params.id;
//   const verifiedToken = req.user;
//   if (!verifiedToken) {
//     throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized');
//   }

//   const { isBlock } = req.body;
//   const user = await UserServices.blockUser(userId, isBlock, verifiedToken);
//   sendResponse(res, {
//     success: true,
//     statusCode: httpStatus.OK,
//     message: `User ${isBlock === 'BLOCK' ? 'blocked' : 'unblocked'} successfully`,
//     data: user,
//   });
// });

// approved Driver
// const approveDriver = catchAsync(async (req: Request, res: Response) => {
//   const userId = req.params.id;
//   const verifiedToken = req.user;
//   if (!verifiedToken) {
//     throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized');
//   }

//   const { isApproved } = req.body;
//   const user = await UserServices.approveDriver(userId, isApproved, verifiedToken);
//   sendResponse(res, {
//     success: true,
//     statusCode: httpStatus.OK,
//     message: `Driver ${isApproved ? 'approved' : 'rejected'} successfully`,
//     data: user,
//   });
// });

export const UserControllers = {
  createUser,
  updateUser,
  // blockUser,
  // approveDriver
};
