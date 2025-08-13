import mongoose from "mongoose"
import { createError } from "../../common/utils/create-error";
import Session from "../session/session.model";
import Class from "./class.model.js";

export const createClass = async(data) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    console.log(data);

    try {
        const {totalSessions, startDate, daysOfWeek} = data;
        if(!totalSessions || !startDate || !daysOfWeek){
            throw createError(400, " Thiếu totalSessions , startDate, of dayOfWeek");
        }

        const classIntance = await classModel.create([data], {session})
        const createdClass = classIntance[0];
        const datesOfWeek = daysOfWeek.split(",").map(Number);

        const sessionDates = generateSessionDates(
            new Date(startDate),
            totalSessions,
            datesOfWeek,
        );

        const sessions = sessionDates.map((sessionDate) => ({
            classId: createdClass._id, 
            sessionDate,
            note: "",
        }))

        await Session.insertMany(session, {session});
        session.endSession();
        return classIntance[0];
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw createError(
            error.status || 500,
            error.message || "Failed to create class"
        );
    }
};

export const getAllClasses = async (query) => {
    const {includeDeleted = false, ...queryParams} = query;
    const data = await queryBuilder(
        Class, {
            ...queryParams, 
            includeDeleted: includeDeleted === "true",
            searchFields: ["name", "teacherId", "subjectId", "majorId"  ],
        },
        {
            populate: [
                {path: "teacherId", select: "fullname username email"},
                {path: "subjectId", select: "name englishName code"},
                {path: "majorId", select: "name code"}
            ]
        }
    );
    return data
}

export const getClassById = async(id) => {
    return await Class.findOne({_id: id, deletedAt: null}).populate("subjectId majorId teacherId studentIds") // * populate : mình muốn lấy gì ra 
}

export const updateClass = async (id, data) => {
    return await Class.findOneAndUpdate(
        {_id: id, deletedAt: null},
        {$set: {deletedAt: new Date()}},
        {new: true},
    );
};

