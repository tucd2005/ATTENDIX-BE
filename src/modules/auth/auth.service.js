import { FRONTEND_URL, RESET_PASSWORD_EXPIRES } from "../../common/configs/enviroment";
import { generateStudentId, generateUsername } from "../../common/utils/code-generator";
import { createError, throwError } from "../../common/utils/create-error";
import { comparePassword, hashPassword } from "../../common/utils/password-handler";
import User from "../user/user.model";
import { MESSAGE } from "./auth.message";


export const registerSevice = async (dataRegister) => {
	const {email , password, fullname, role} = dataRegister; 

	const existingUsers = await User.findOne({email});
	if(existingUsers){
		return next(createError(400, MESSAGE.EMAIL_ALREADY_EXISTS));
	}

	const passwordHash = await hashPassword(password);

	const username = await generateUsername(fullname)

	let studentId = await generateStudentId();
	
	const newUser = await User.create({
		...dataRegister, 
		password: passwordHash,
		username,
		studentId
	});

	newUser.password = undefined; 
	return newUser;
};

 export const loginSevice = async (dataLogin) => {
	const {email, password} = dataLogin; 

	const user = await User.findOne({email}); 

	if (!user) return next(createError(401, MESSAGE.USER_NOT_FOUND))
	
	const isMatch = comparePassword(password, user.password);
	if(!isMatch) return next(createError(401, MESSAGE.INVALID_PASSWORD));

	const accsessToken = signToken({id: user._id}, "1d");
	const refreshToken = signToken({id: user._id}, "30d");

	user.password = undefined;
	return {
		user, 
		accsessToken,
		refreshToken
	}
 };

export const refreshTokenService = async( refreshToken) => {
	if(!refreshToken) throwError(401, MESSAGE.INVALID_REFRESH_TOKEN);

	const {valid, decoded} = verifyToken(refreshToken);
	if(valid){
		const accsessToken = signToken({id: decoded.id}, "1d");
		const newRefreshToken = signToken({ id: decoded.id}, "30d");
		return {accsessToken, refreshToken: newRefreshToken};
	}
};

export const forgotPasswordService = async (email) => {
	const user = await User.findOne({email});
	if(!user) throwError(404, MESSAGE.USER_NOT_FOUND);

	const resetToken = signToken({
		id: user._id,
		role: user.role
	},
	RESET_PASSWORD_EXPIRES || "15m"
);
	const resetLink = `${FRONTEND_URL}/auth/reset-password/${resetToken}`;
	const subject = "[CodeFarm] Đặt lại mật khẩu cho tài khoản của bạn";
	const html = generateResetPasswordEmail(resetLink, RESET_PASSWORD_EXPIRES || "15 phut")
}

