import transporter from "../config/nodemailer";
import dotenv from "dotenv";

dotenv.config();

export default async function sendMail(receiver: string, subject: string, body: string) {

    await transporter.sendMail({
        from: `UHostel ${process.env.MAIL_USER}`,
        to: receiver,
        subject: subject,
        text: body
    });
}