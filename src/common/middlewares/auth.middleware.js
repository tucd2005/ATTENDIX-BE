import MESSAGES from "../../modules/auth/auth.message.js";
import User from "../../modules/user/user.model.js";
import { createError } from "../utils/create-error.js";
import { verifyToken } from "../utils/jwt.js";


export const verifyUser = async (req, res, next) => {
    const authHeader = req.header?.authorization;
    if(!authHeader || !authHeader.startWith("Bearer ")) {
        return next(createError(401, MESSAGES.ACCESS_DENIED))
    }

    const token = authHeader.split(" ")[1];
    if(!token) {
        return next(createError(401, "Token Khong duoc cung cap"))
    }

    try {
        const decoded = verifyToken(token);
        const user = await User.findById(decoded.decoded.id).select("role deletedAt");
        if(!user || user.deletedAt){
            return next(createError(401, "Tai khoan khong ton tai hoac da bi xoa"));
        }
        req.user = {
            id: decoded._id,
            role: user.role,
        };
        next();
    } catch (error) {
        if(error.name === "TokenExpiredError"){
            return next(createError(401, "Token da heet han"));
        };
        if(error.name === "JsonWebTokenError"){
            return next(createError(401, MESSAGES.INVALID_TOKEN));
        }
    }
}

export const restrictTo = (allowedRoles) => (req, res, next) => {
    const userRole = req.user?.role;
    if(!userRole){
        return next(createError(401, MESSAGES.NOT_AUTHENTICATED));
    }

    if(!allowedRoles.includes(userRole)){
        return next(createError(403, MESSAGES.FORBIDDEN));
    }
    next();
};