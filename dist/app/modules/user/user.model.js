"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const user_interface_1 = require("./user.interface");
const authProviderSchema = new mongoose_1.Schema({
    provider: { type: String, required: true },
    providerId: { type: String, required: true },
}, {
    versionKey: false,
    _id: false,
});
const vehicleInfoSchema = new mongoose_1.Schema({
    vehicleType: { type: String, required: true },
    licensePlate: { type: String, required: true },
}, { _id: false });
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: Object.values(user_interface_1.Role),
        default: user_interface_1.Role.RIDER,
    },
    phone: { type: String },
    picture: { type: String },
    address: { type: String },
    isDeleted: { type: Boolean, default: false },
    isBlock: {
        type: String,
        enum: Object.values(user_interface_1.IsBlock),
        default: user_interface_1.IsBlock.UNBLOCK,
    },
    isVerified: { type: Boolean, default: false },
    rides: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Ride" }],
    auths: [authProviderSchema],
    isApproved: { type: Boolean, default: false }, // Driver-specific
    isOnline: { type: Boolean, default: false }, // Driver-specific
    vehicleInfo: { type: vehicleInfoSchema }, // Driver-specific
}, {
    timestamps: true,
    versionKey: false,
});
exports.User = (0, mongoose_1.model)("User", userSchema);
