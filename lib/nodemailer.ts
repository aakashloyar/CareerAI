// 📂 lib/nodemailer.ts
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.app_email,
        pass: process.env.app_password
    }
});

export default transporter;