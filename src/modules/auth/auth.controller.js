import handleAsync from "../../common/utils/async-handler.js";
import { createError } from "../../common/utils/create-error.js";
import { createResponse } from "../../common/utils/create-response.js";
import MESSAGE from "./auth.message.js";
import { forgotPasswordService, loginSevice, refreshTokenService, registerSevice } from "./auth.service.js";


export const registerUser = handleAsync(async (req, res, next) => {
    const newUser = await registerSevice(req.body)
    return createResponse(res, 201, MESSAGE.REGISTER_SUCCESS, newUser);
});

export const loginUser = handleAsync(async (req, res, next) => {
    const data = await loginSevice(req.body);
    return createResponse(res, 200, MESSAGE.LOGIN_SUCCESS, data)
});

export const refreshToken = handleAsync(async (req, res, next) => {
    const refreshToken = req.body?.refreshToken || req.headers["x-refresh-token"] || req.cookies.refreshToken;
    const data = await refreshTokenService(refreshToken);
    return createResponse(res, 200, MESSAGE.REFRESH_TOKEN_SUCCES, data);
});

export const forgotPassword = handleAsync(async (req, res , next) => {
    const isSendMail = await forgotPasswordService(req.body.email);
    if(!isSendMail){
        return createError(400, MESSAGE.SEND_MAIL_FAIL);
    }
    return createResponse(res,200, MESSAGE.SEND_SUCCESS)
});

export const resetPassword = handleAsync(async (req, res, next) => {
    const isResetPassword = await resetPasswordService(req.body.resetToken, req.body.newPassword);

    if(!isResetPassword) return res.status(400).json(createError(400, MESSAGE.PASSWORD_CHANGE_FAILED));

    return createResponse(res, 200, MESSAGE.PASSWORD_RESET_SUCCESS)
})

