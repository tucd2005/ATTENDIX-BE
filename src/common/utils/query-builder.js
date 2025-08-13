export const queryBuilder = async (Model, queryParams, options = {}) => {
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

  const { populate = [] } = options;

  //* xây dựng điều kiện truy vấn
  const queryConditions = {};

  //* xử lí soft delete
  if (!includeDeleted) {
    queryConditions.deletedAt = null;
  }

  //* Áp dụng bộ lọc từ query parameters
  Object.keys(filters).forEach((key) => {
    if (filters[key]) {
      queryConditions[key] = filters[key];
    }
  });

  //* áp dụng tìm kiếm nếu có
  if (search && searchFields.length > 0) {
    const searchRegex = new RegExp(search, "i");
    queryConditions.$or = searchFields.map((field) => ({
      [field]: searchRegex,
    }));
  }

  // * tạo truy vanas Mongoose  với các điều kiện
  let query = Model.find(queryConditions);

  //* Áp dụng sắp xếp
  const sortOrder = order === "desc" ? -1 : 1;
  query = query.sort({
    [sort]: sortOrder,
  });

  //* áp dụng phân trang
  const pageNum = parseInt(page, 10);
  const limitNum = parseInt(limit, 10);
  const skip = (pageNum - 1) * limitNum;
  query = query.skip(skip).limit(limitNum);

  //*
  const total = await Model.countDocuments(queryConditions);
  const data = await query.exec();

  if (!data || data.length === 0) {
    throw createError(404, "Not found");
  }

  return {
    data,
    meta: {
      total,
      page: pageNum,
      limit: limitNum,
      totalPages: Math.ceil(total / limitNum),
    },
  };
};
