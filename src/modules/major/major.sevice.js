import Major from "./major.model";

export const createMajor = async (data) => {
    const major = await Major.create(data) ;
    return major;
};

export const getAllMajors = async(query) => {
    const {includeDeleted = false, ...queryParams} = query;
    const data = await queryBuilder(Major, {
        ... queryParams, 
        includeDeleted: includeDeleted === "true",
        searchFields: ["name", "code", "description"],
    });
    return data;
};

export const getMajorById = async (id) => {
    return await Major.findOne({ _id: id, deletedAt: null});
};

export const updateMajor = async (id, data) => {
    return await Major.findOneAndUpdate({ _id: id, deletedAt: null}, {
        $set: data}, {new: true, runValidators: true}); 
};

export const softDeleteMajor = async(id) => {
    return await Major.findOneAndUpdate({ _id: id, deletedAt: null}, {
        $set: { deletedAt: new Date()}
    }, {new: true});
};

export const restoreMajor = async (id) => {
    return await Major.findOneAndUpdate(
        {_id: id, deletedAt: {$ne: null}},
        {$set: {deletedAt: null}},
        {new: true}
    );
};

