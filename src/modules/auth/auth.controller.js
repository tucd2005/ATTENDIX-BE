import handleAsync from "../../common/utils/async-handler";
import { createResponse } from "../../common/utils/create-response";
import { MESSAGE } from "./auth.message";
import { refreshTokenService, registerSevice } from "./auth.service";


export const registerUser = handleAsync(async (req, res, next) => {
    const newUser = await registerSevice(req.body)
    return createResponse(res, 201, MESSAGE.REGISTER_SUCCESS, newUser);
});

export const loginUser = handleAsync(async (req, res, next) => {
    const data = await loginUser(req.body);
    return createResponse(res, 200, MESSAGE.LOGIN_SUCCESS, data)
});

export const refreshToken = handleAsync(async (req, res, next) => {
    const refreshToken = req.body?.refreshToken || req.headers["x-refresh-token"] || req.cookies.refreshToken;
    const data = await refreshTokenService(refreshToken);
    return createResponse(res, 200, MESSAGE.REFRESH_TOKEN_SUCCES, data);
});

