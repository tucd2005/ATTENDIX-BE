import nodemailer from "nodemailer";
import { EMAIL_PASSWORD, EMAIL_USERNAME } from "../configs/enviroment";
import { createError } from "./create-error";

const sendEmail = async (email, subject, options = {}) => {
    const {text, html} = options; 

    const transporter = nodemailer.createTransport({
        service: "gmail", 
        auth: {
            user: EMAIL_USERNAME || "tucdph51409@gmail.com",
            pass: EMAIL_PASSWORD,
        },
    });

    const mailOptions = {
        from: ' "Chu Duc Tu" <tucdph51409@gmail.com>',
        to: email, 
        subject: subject,
        text: text || "This email requires an HTML-compatible email client.",
        html: html || text,
    }

    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        throw createError(500, `Gui email that bai: ${error.message}`)
    }
}
export default sendEmail;