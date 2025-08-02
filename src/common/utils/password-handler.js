import bcrypt from "bcrypt"
export const hashPassword = async (password) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    return hash;
};

export const comparePassword = async (password, hash) => {
    return bcrypt.compareSync(password, hash)
};

export const randomPassword = async (length = 8) => {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";
    let password = "";
    for(let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random()*charset.length);
        password += charset[randomIndex];
    }
    return password;
};