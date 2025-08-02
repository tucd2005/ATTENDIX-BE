import User from "../../modules/user/user.model.js";


export const generateUsername = async (fullname) => {
    const parts = fullname
                    .trim()
                    .toLowerCase()
                    .replace(/[^a-z\s]/g, "")
                    .split(/\s+/);


                    
    const prefix = `${lastName}${initials}`.slice(0,20);

    const regex = new RegExp(`^${prefix}\\d{0,3}$`);
    const existingUsers = await User.find({username: regex}).select("username").lean().exec()

    if(!existingUsers || existingUsers.length == 0){
        return `${prefix}001`;
    }

    const sequenceNumbers = existingUsers.map((user)=> {
        const match = user.username.match(/\d+$/);
        return match ? parseInt(match[0],10) : 0;
    })
    .filter((num)=> num>=0);

    const maxSequence = sequenceNumbers.length > 0 ? Math.max(...sequenceNumbers) : 0;
    const nextSequence = maxSequence +1;

    if(nextSequence > 999) {
        throw createError(400, "Đã đạt giới hạn số thứ tự cho username này")
    }

    const formattedSequence = nextSequence.toString().padStart(3, "0")
    return `${prefix}${formattedSequence}`;

};

export const generateStudentId = async () => {
    const currentYear = new Date().getFullYear().toString().slice(-2);
    const prefix = `CF${currentYear}`;

    const regex = new RegExp(`^${prefix}\\d{3}$`);
    const exitingIds = await User.find({studentId: regex}).select("studentId").lean().exec();

    if(!exitingIds || exitingIds.length === 0){
        return `${prefix}001`;
    }

    const sequenceNumbers = exitingIds.map((doc)=> parseInt(doc.studentId.slice(-3), 10)).filter((num) => !isNaN(num))

    const maxSequence = Math.max(...sequenceNumbers);
    const nextSequence = maxSequence +1;

    if(nextSequence > 999) {
        throw createError(400, "Đã đạt giới hạn mã sinh viên cho năm hiện tại" );
    }

    const formattedSequence = nextSequence.toString().padStart(3,"0");

    return `${prefix}${formattedSequence}`;
}




