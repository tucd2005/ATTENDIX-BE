import handleAsync from "../../common/utils/async-handler.js";
import { createError } from "../../common/utils/create-error.js";
import { createResponse } from "../../common/utils/create-response.js";
import MESSAGES from "./major.message.js";
import * as majorService from "./major.sevice.js"

export const createMajor = handleAsync(async (req,res) => {
    const major = await majorService.createMajor(req.body);
    return createResponse(res, 201, MESSAGES.CREATED_SUCCESS, major);
})

export const getAllMajors = handleAsync(async(req, res) => {
    const majors = await majorService.getAllMajors(req.query);
    return createResponse(res, 200, MESSAGES.CREATED_SUCCESS, majors.data, majors.meta);
})

export const getMajorById = handleAsync(async (req, res) => {
    const major = await majorService.getMajorById(req.params.id);
    if(!major) {
        throw createError(404, MESSAGES.NOT_FOUND);
    }
    return createResponse(res, 200, MESSAGES.GET_SUCCESS, major)
})

export const updateMajor = handleAsync(async(req, res) => {
    const major = await majorService.updateMajor(req.params.id, req.body);
    if(!major){
        throw createError(404, MESSAGES.NOT_FOUND);
    }
    return createResponse(res, 200, MESSAGES.UPDATED_SUCCESS, major);
})

export const softDeleteMajor = handleAsync(async(req, res) => {
    const major = await majorService.softDeleteMajor(req.params.id);
    if(!major) {
        throw createError(404, MESSAGES.NOT_FOUND);
    };
    return createResponse(res, 200, MESSAGES.DELETED_SUCCESS, major);
});

export const restoreMajor = handleAsync(async(req, res) => {
    const major = await majorService.restoreMajor(req.params.id);
    if(!major) {
        throw createError(404, MESSAGES.NOT_FOUND);
    }
    return createResponse(res, 200, MESSAGES.RESTORED_SUCCESS, major)
})