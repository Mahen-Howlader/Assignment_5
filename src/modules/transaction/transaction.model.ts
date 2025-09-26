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

const transactionSchema = new Schema<ITransaction>({
    user: { type: Schema.Types.ObjectId, ref: "user", required: true },
    type: { type: String, enum: TransactionType, required : true},
    amount : {type : Number, required : true},
    status : {type : String, enum : TransactionStatus , required : true}
});

export  const transaction = model("transaction", transactionSchema);