import { model, Schema } from "mongoose";
import { ITransaction } from "./transaction.interface";
export enum TransactionType {
    DEPOSIT = "deposit",
    WITHDRAW = "withdraw",
}

export enum TransactionStatus {
    SUCCESS = "success",
    FAILED = "failed",
}

const txSchema = new Schema<ITransaction>({
    from: { type: Schema.Types.ObjectId, ref: 'user' },
    to: { type: Schema.Types.ObjectId, ref: 'user' },
    user : {type : Schema.Types.ObjectId, ref : "user"},
    type: { type: String, required: true },
    balance: { type: Number, required: true },
    fee: { type: Number, default: 0 },
    status: { type: String, default: 'completed' },
    narrative: { type: String },
    prevBalance: { type: Number, required: true },
    newBalance: { type: Number, required: true },
}, { timestamps: true });

export const transaction = model("transaction", txSchema);