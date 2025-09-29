import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken';

export const genaretToken = (payload: JwtPayload, secret: string, expiredIn: string) => {
    const token = jwt.sign(payload, secret, { expiresIn : expiredIn } as SignOptions);
    return token;
};

export const verifyToken = (token : string ,secret : string) => {
    const verifydToken = jwt.verify(token,secret) ;
    return verifydToken as JwtPayload;
};