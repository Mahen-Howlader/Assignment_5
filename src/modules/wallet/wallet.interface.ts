import { Types } from "mongoose";

export interface IWallet {
    user : Types.ObjectId,
    ammount : number,
    isBlock : boolean,
    createAt : Date
}