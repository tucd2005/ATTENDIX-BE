import { JWT_EXPIRES_IN, JWT_SECRET } from "../configs/enviroment.js";
import jwt from "jsonwebtoken"
export const signToken = (payload, expiresIn = JWT_EXPIRES_IN || '1d') => {
     return jwt.sign(payload, JWT_SECRET, {expiresIn}); 
}

export const verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        return {valid: true, decoded}
    } catch (error) {
        return {valid: false, error: err}
    }
}