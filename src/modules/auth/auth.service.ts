import AppError from "../../error/AppError";
import { IUser } from "../user/user.interface";
import { User } from "../user/user.model";
import bcrypt from 'bcryptjs';
import { Wallet } from "../wallet/wallet.model";
import config from "../../config";
import { SignOptions } from "jsonwebtoken";
import jwt from "jsonwebtoken";


const loginUser = async (payload: IUser) => {
    const isUserExist = await User.findOne({ email: payload.email });
    if (!isUserExist) throw new AppError(404, "User not found");
    const checkPassword = await bcrypt.compare(payload.password, isUserExist.password);
    if (!checkPassword) throw new AppError(403, "Password not matched");
    // Auto-create wallet
    let existingWallet = await Wallet.findOne({ user: isUserExist._id });
    if (!existingWallet) {
        try {
            existingWallet = await Wallet.create({ user: isUserExist._id, balance: Number(config.ammount || 50) });
            console.log("Wallet automatically created for:", isUserExist.email);
        } catch (err) {
            console.error("Wallet creation failed:", err);
            throw new AppError(500, "Failed to create wallet");
        }
    }

    const jwtPayload = {
        email: isUserExist.email,
        role: isUserExist.role,
        id: isUserExist._id
    };

    const accessToken = jwt.sign(jwtPayload, config.jwt.jwt_access_secret as string, { expiresIn: config.jwt.jwt_expires_secret } as SignOptions);
    const refreshToken = jwt.sign(jwtPayload, config.jwt.jwt_refresh_secret as string, { expiresIn: config.jwt.jwt_refresh_expires } as SignOptions);

    return { accessToken, refreshToken };
};

const retisterUser = async (payload: Partial<IUser>) => {
  const { email, password, phone, ...rest } = payload;

  if (!email || !password) {
    throw new Error("Email and password must be provided");
  }

  const existing = await User.findOne({ email });
  if (existing) {
    throw new Error("Email already exists");
  }

  const hashPassword = await bcrypt.hash(password, Number(process.env.BCRYPT_SALT_ROUND));

  const user = await User.create({
    email,
    password: hashPassword,
    phone,
    ...rest
  });

  return user;
};

export const authService = {
    loginUser,
    retisterUser
}