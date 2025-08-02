
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
        queryConditions.$or = searchFields.map(field) => ({
            [field]: 
        })
    }


}