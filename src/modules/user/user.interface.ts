
export type Role = "admin" | "user" | "agent";

export interface IUser {
  _id?: string;
  name: string;
  email: string;
  phone?: string | null;
  password: string;
  role: Role;
  blance: number;
  walletId?: string;
  isBlocked?: boolean;
  isApproved?: boolean;
  metadata?: Record<string, any>;
  lastLoginAt?: Date | null;
};
