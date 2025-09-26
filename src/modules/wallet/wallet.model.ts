import { model, Schema } from "mongoose";
import { IWallet } from "./wallet.interface";

const walletSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "user", require: true, unique: true },
    blance: { type: Number, default: 0 },
    isBlocked: { type: Boolean, default: false }
},
    { timestamps: true }
);


export const Wallet = model<IWallet>("Wallet", walletSchema);