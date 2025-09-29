import { Types } from "mongoose";

export enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
  AGENT = "AGENT"
};

export interface IUser {
  _id : string,
  name: string;
  email: string;
  password: string;
  phone: string;
  role: Role;
  isAgentApproved?: boolean;
  walletId?: Types.ObjectId;
};
