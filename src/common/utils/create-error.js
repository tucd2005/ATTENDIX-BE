export const createError = (statusCode, message) => {
    const error = new Error(message || "Internal Sever Error");
    error.statusCode = statusCode || 500;
    return error;
};

export const throwError = (status, message) => {
    throw createError(status, message)
}