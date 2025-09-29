"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Commission = void 0;
const mongoose_1 = require("mongoose");
const commissionSchema = new mongoose_1.Schema({
    agent: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    type: {
        type: String,
        enum: ["cash-in", "cash-out"],
        required: true,
    },
    commission: {
        type: Number,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true,
    versionKey: false,
});
exports.Commission = (0, mongoose_1.model)("commission", commissionSchema);
