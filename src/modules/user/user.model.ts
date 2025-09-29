import { model, Schema } from "mongoose";
import { IUser, Role } from "./user.interface";
const userSchema = new Schema<IUser>(
  {
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
      enum: Object.values(Role),
      default: Role.USER,
    },
    phone: {
      type: String,
      unique: true,
      required: true
    },
    isAgentApproved : {type : Boolean, default : false},
    walletId: { type: Schema.Types.ObjectId, ref: "Wallet" },
  },
  { timestamps: true }
);

export const User = model<IUser>("user", userSchema);