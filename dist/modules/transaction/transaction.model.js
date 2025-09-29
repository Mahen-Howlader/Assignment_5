"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transaction = exports.TransactionStatus = exports.TransactionType = void 0;
const mongoose_1 = require("mongoose");
var TransactionType;
(function (TransactionType) {
    TransactionType["DEPOSIT"] = "deposit";
    TransactionType["WITHDRAW"] = "withdraw";
})(TransactionType || (exports.TransactionType = TransactionType = {}));
var TransactionStatus;
(function (TransactionStatus) {
    TransactionStatus["SUCCESS"] = "success";
    TransactionStatus["FAILED"] = "failed";
})(TransactionStatus || (exports.TransactionStatus = TransactionStatus = {}));
const txSchema = new mongoose_1.Schema({
    from: { type: mongoose_1.Schema.Types.ObjectId, ref: 'user' },
    to: { type: mongoose_1.Schema.Types.ObjectId, ref: 'user' },
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "user" },
    type: { type: String, required: true },
    balance: { type: Number, required: true },
    fee: { type: Number, default: 0 },
    status: { type: String, default: 'completed' },
    narrative: { type: String },
    prevBalance: { type: Number, required: true },
    newBalance: { type: Number, required: true },
}, { timestamps: true });
exports.transaction = (0, mongoose_1.model)("transaction", txSchema);
