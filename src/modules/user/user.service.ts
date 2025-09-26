import { IUser } from "./user.interface";
import bcrypt from 'bcryptjs';
import { User } from "./user.model";
import AppError from "../../error/AppError";
import jwt, { SignOptions } from "jsonwebtoken";
import config from "../../config";
const createUser = async (payload: Partial<IUser>) => {
  const { email, password, phone, ...rest } = payload;

  if (!email || !password) {
    throw new Error("Email and password Must be Provide");
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

const loginUser = async (payload: IUser) => {
  const isUserExist = await User.findOne({ email: payload.email });
  if (!isUserExist) {
    throw new AppError(404, "User not found");
  };
  const checkPassword = await bcrypt.compare(
    payload.password,
    isUserExist.password
  );
  if (!checkPassword) {
    throw new AppError(403, "Password not matched");
  }

  const jwtPayload = {
    email: isUserExist.email,
    role: isUserExist.role
  }

  const accessToken = jwt.sign(jwtPayload, config.jwt.jwt_access_secret as string, 
    {expiresIn: config.jwt.jwt_expires_secret} as SignOptions)

  const refresToken = jwt.sign(jwtPayload, config.jwt.jwt_refresh_secret as string, 
    {expiresIn : config.jwt.jwt_refresh_expires} as SignOptions
  )

    return {
      accessToken,
      refresToken
    }

};

const getUser = () => {

};


const updateUser = () => {

};

export const UserService = {
  createUser,
  getUser,
  updateUser,
  loginUser
};