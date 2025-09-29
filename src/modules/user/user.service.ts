import { IUser, Role } from "./user.interface";
import bcrypt from 'bcryptjs';
import { User } from "./user.model";
import AppError from "../../error/AppError";
import { Wallet } from "../wallet/wallet.model";

const getUserById = async (userId: string) => {
  const user = await User.findById(userId).select("-password");

  if (!user) {
    throw new AppError(404, "User not found");
  }

  return user;
};

const getAllUsers = () => {
  return User.find({ role: "USER" }).select("-password").lean();
};
const getAllAgents = () => {
  return User.find({ role: "AGENT" }).select("-password").lean();
};
const getAllWallets = () => {
  return Wallet.find();
};

const toggleUserWallet = async (userId: string, block: boolean) => {
  const wallet = await Wallet.findOne({ user: userId });
  if (!wallet) throw new AppError(404, "User wallet not found");
  wallet.isBlocked = block;
  await wallet.save();
  return { message: block ? "Wallet blocked" : "Wallet unblocked" };
};

const toggleAgentStatus = async (agentId: string, approve: boolean) => {
  const agent = await User.findById(agentId);
  if (!agent) throw new AppError(404, "Agent not found");

  agent.isAgentApproved = approve;

  // Type assertion 
  agent.role = (approve ? "AGENT" : "USER") as Role;

  await agent.save();

  return {
    message: approve
      ? "Agent approved and role set to AGENT"
      : "Agent suspended and role set to USER",
  };
};



export const UserService = {
  getUserById,
  getAllUsers,
  toggleUserWallet,
  toggleAgentStatus,
  getAllAgents,
  getAllWallets
};