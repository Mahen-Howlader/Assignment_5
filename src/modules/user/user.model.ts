import { model, Schema } from "mongoose";
import { IUser } from "./user.interface";
const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true, index: true },
  phone: String,
  password: { type: String, required: true }, // ✅ password
  role: { type: String, enum: ["admin", "user", "agent"], default: "user" },
  isBlocked: { type: Boolean, default: false },
  isApproved: { type: Boolean, default: false },
  blance : {type : Number, default : 50},
  metadata: { type: Schema.Types.Mixed },
  lastLoginAt: Date,
}, { timestamps: true });

export const User = model<IUser>("user", userSchema);