"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const user_interface_1 = require("./user.interface");
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters"],
    },
    role: {
        type: String,
        enum: Object.values(user_interface_1.Role),
        default: user_interface_1.Role.USER,
    },
    phone: {
        type: String,
        unique: [true, "Phone number must be unique"],
        required: [true, "Phone number is required"],
    },
    isAgentApproved: { type: Boolean, default: false },
    walletId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Wallet" },
}, { timestamps: true });
exports.User = (0, mongoose_1.model)("user", userSchema);
