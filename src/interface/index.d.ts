import { IUser } from '../modules/user/user.interface';
import { Request } from 'express';

declare global {
    namespace Express{
        interface Request {
            user : IUser;
        }
    }
}