import { generateStudentId, generateUsername } from "../../common/utils/code-generator.js";
import { createError } from "../../common/utils/create-error.js";
import { randomPassword } from "../../common/utils/password-handler.js";
import { MESSAGE } from "../auth/auth.message.js";
import User from "./user.model.js"


export const updateUserRole = async (userId, role) => {
    const user = await User.findById(userId);
    if(!user) {
        throw createError(404, MESSAGE.USER_NOT_FOUND)
    }
    if(role === "superAdmin"){
        throw createError(400, MESSAGE.UNAUTHORIZED);
    }

    user.role = role;
    user.updatedAt = new Date();
    return user.save();
};

export const blockUser = async (userId, isBlocked) => {
    const user = await User.findById(userId);
    if (!user) {
        throw createError(404, MESSAGE.USER_NOT_FOUND);
    }

    user.isBlocked = isBlocked;
    user.updatedAt = new Date();
    return user.save();
};

export const getUserById = async (userId) => {
    const user = await User.findById(userId).select("-password");
    if(!user) {
        throw createError(404, MESSAGE.USER_NOT_FOUND);
    }
    return user;
};

export const updateProfile = async (userId, profileData) => {
    const user = await User.findById(userId);
    if(!user) {
        throw createError(404, MESSAGE.USER_NOT_FOUND)
    };

    if(profileData.email && profileData.email !== user.email){
        const existingUser = await User.findOne({ email : profileData.email})
        if(existingUser) {
            throw createError(400, MESSAGE.EMAIL_ALREADY_EXISTS);
        }
    }

    user = {
        ...user.toObject(),
        ...profileData, 
        updatedAt: new Date(),
    };
    return user.save();
};

export const createUser = async(userData) => {
    userData.username = await generateUsername(userData.fullname);
    if(userData.role === "student" || !userData.role){
        userData.studentId = await generateStudentId();
    }

    userData.password = randomPassword();

    const newUser = await User.create(userData);
    return newUser;
};

export const getAllUser = async(query) => {
    const {includeDeleted = false, ...queryParams} = query;
    // const data = await queryBui
}