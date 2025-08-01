"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserControllers = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const user_service_1 = require("./user.service");
const sendResponse_1 = require("../../utils/sendResponse");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const AppError_1 = __importDefault(require("../../errorHelpers/AppError"));
// create new user
const createUser = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_service_1.UserServices.createUser(req.body);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.CREATED,
        message: "User Created Successfully!",
        data: user,
    });
}));
// update user
const updateUser = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    const verifiedToken = req.user;
    if (!verifiedToken) {
        return next(new AppError_1.default(401, "Unauthorized"));
    }
    const payload = req.body;
    const user = yield user_service_1.UserServices.updateUser(userId, payload, verifiedToken);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: "User Updated Successfully",
        data: user,
    });
}));
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
exports.UserControllers = {
    createUser,
    updateUser,
    // blockUser,
    // approveDriver
};
