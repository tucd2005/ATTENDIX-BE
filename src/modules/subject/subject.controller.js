import handleAsync from "../../common/utils/async-handler.js";
import { createError } from "../../common/utils/create-error";
import { createResponse } from "../../common/utils/create-response";
import MESSAGE from "./subject.message.js";
import * as subjectService from "./subject.service.js"

export const createSubject = handleAsync(async(req, res) => {
    const subject = await subjectService.createSubject(req.body);
    return createResponse(res, 201, MESSAGE.CREATED_SUCCESS, subject )
})

export const getAllSubjects = handleAsync(async(req, res) => {
    const subjects = await subjectService.getAllSubjects(req.query);
    return createResponse(res, 200, MESSAGE.CREATED_SUCCESS, subjects.data,subjects.meta )
})

export const getSubjectById = handleAsync(async(req, res) => {
    const subject = await subjectService.getSubjectById(req.params.id);
    if(!subject){
        throw createError(res, 404, MESSAGE.NOT_FOUND);
    }
    return createResponse(res, 200 , MESSAGE.GET_SUCCESS, subject)
})

export const updateSubject = handleAsync(async(req, res) => {
    const subject = await subjectService.updateSubject(req.params.id, req.body );
    if(!major){
        throw createError(404, MESSAGE.NOT_FOUND);
    }
    return createResponse(res, 200, MESSAGE.UPDATED_SUCCESS, subject)
})

export const softDeleteSubject = handleAsync(async(req, res) => {
    const subject = await subjectService.softDeleteSubject(req.params.id);
    if(!subject){
        throw createError(404, MESSAGE.NOT_FOUND);
    }
    return createResponse(res, 200, MESSAGE.DELETED_SUCCESS, subject);
})

export const restoreSubject = handleAsync(async(req, res) => {
    const subject = await subjectService.restoreSubject(req.params.id) ;
    if(!subject) {
        throw createError(404, MESSAGE.NOT_FOUND);
    }
    return createResponse(res, 200, MESSAGE.RESTORED_SUCCESS, subject)
})