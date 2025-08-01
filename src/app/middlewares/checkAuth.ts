import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt";
import { envVars } from "../config/env";
import { JwtPayload } from "jsonwebtoken";
import { User } from "../modules/user/user.model";

import httpStatus from "http-status-codes";
import AppError from "../errorHelpers/AppError";
import { IsBlock } from "../modules/user/user.interface";

export const checkAuth =
  (...authRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const accessToken = req.headers.authorization;
      if (!accessToken) {
        throw new AppError(403, "No token received");
      }

      const verifiedToken = verifyToken(
        accessToken,
        envVars.JWT_ACCESS_SECRET
      ) as JwtPayload;

      const isUserExist = await User.findOne({
        email: verifiedToken.email,
      });

      if (!isUserExist) {
        throw new AppError(httpStatus.BAD_REQUEST, "User does not exist");
      }

      if (!isUserExist.isVerified) {
        throw new AppError(httpStatus.BAD_REQUEST, "User is not Verified");
      }

      if (!isUserExist.isVerified) {
        throw new AppError(httpStatus.BAD_REQUEST, "User is not Verified");
      }

      if (isUserExist.isBlock === IsBlock.BLOCK) {
        throw new AppError(httpStatus.BAD_REQUEST, `User is Blocked`);
      }

      if (isUserExist.isDeleted) {
        throw new AppError(httpStatus.BAD_REQUEST, "User is Deleted");
      }

      if (!authRoles.includes(verifiedToken.role)) {
        throw new AppError(403, "You are not permitted to do this");
      }

      req.user = verifiedToken;
      next();
    } catch (error) {
      next(error);
    }
  };
