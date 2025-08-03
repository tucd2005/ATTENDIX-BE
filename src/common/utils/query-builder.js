
export const queryBuilder = async(Model, queryParams, options = {}) => {
    const {
        page = 1, 
        limit = 10, 
        sort = "createdAt", 
        order = "desc",
        search,
        searchFields = [],
        includeDeleted = false,
        ...filters
    } = queryParams;

    const queryConditions = {};

    if(!includeDeleted) {
        queryConditions.deletedAt = null;
    }

    Object.keys(filters).forEach((key) => {
        if(filters[key]){
            queryConditions[key] = filters[key];
        }
    });

    if(search && searchFields.length > 0) {
        const searchRegex = new RegExp(search, "i");
        queryConditions.$or = searchFields.map((field) => ({
            [field]: searchRegex,
        }))
    }

    let query = Model.find(queryConditions);

    const sortOrder = order === "desc" ? -1 : 1;
    query = query.sort({
        [sort]: sortOrder
    });

    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;
    query = query.sort({
        [sort]: sortOrder
    });

    const total = await Model.countDocuments(queryConditions);
    const data = await query.exec();

    if(!data || data.length === 0){
        throw createError(404, "Not found");
    }

    return {
        data, 
        meta: {
                total, 
                page: pageNum,
                limit: limitNum,
                totalPages: Math.ceil(total / limitNum),
            }
        }
}