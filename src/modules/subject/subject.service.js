import { queryBuilder } from "../../common/utils/query-builder.js";
import Subject from "./subject.model.js"


export const createSubject = async(data) => {
    const subject = await Subject.create(data);
    return subject;
};

export const getAllSubjects = async(query) => {
    const {includeDeleted = false, ...queryParams} = query;
    const data = await queryBuilder(Subject, {
        ...queryParams, 
        includeDeleted: includeDeleted === "true",
        searchFields: ["name", "englishName", "code", "description"],
    });
    return data;
}

export const getSubjectById = async(id) => {
    return await Subject.findOne({ _id: id, deletedAt: null});
};

export const updateSubject = async(id, data) => {
    return await Subject.findOneAndUpdate({ _id: id, deletedAt: null}, {
        $set:data}, {new: true, runValidators: true});
};

export const softDeleteSubject = async(id) => {
    return await Subject.findByIdAndUpdate({ _id: id, deletedAt: null}, 
        {$set: {deletedAt: new Date()}
    }, {new: true});
};

export const restoreSubject = async(id) => {
    return await Subject.findByIdAndUpdate(
        {_id: id, deletedAt: {$ne: null}},
        {$set: {deletedAt: null}},
        {new: true}
    )
}

