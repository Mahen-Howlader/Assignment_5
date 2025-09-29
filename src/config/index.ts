
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
    node_env: process.env.NODE_ENV,
    port: process.env.PORT,
    mongo_url: process.env.MONGO_URL,
    password_sart_round: process.env.BCRYPT_SALT_ROUND,
    ammount : process.env.AMMOUNT,
    jwt: {
        jwt_access_secret : process.env.JWT_ACCESS_SECRET,
        jwt_expires_secret : process.env.JWT_EXPIRES_SECRET,
        jwt_refresh_secret : process.env.JWT_REFRESH_SECRET,
        jwt_refresh_expires : process.env.JWT_REFRESH_EXPIRES
    }
};