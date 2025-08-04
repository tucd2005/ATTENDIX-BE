import handleAsync from "../../common/utils/async-handler.js";


export const updateRole = handleAsync(async(req, res) => {
    const {userId} = req.params;
    const {role} = req.body;

    const updateUser = await userSevice
})