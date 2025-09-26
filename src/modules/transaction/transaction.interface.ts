import { Types } from "mongoose";

export interface ITransaction {
    user: Types.ObjectId;
    type: "deposit" | "withdraw";
    amount: number;
    status: "success" | "failed";
    createdAt: Date;
};