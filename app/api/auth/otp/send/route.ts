import { NextRequest } from 'next/server';
import crypto from 'crypto';
import { prisma } from '@/lib/prisma';
import { v4 as uuidv4 } from 'uuid';
import { serialize } from 'cookie';
import transporter from '@/lib/nodemailer';

export async function POST(req: NextRequest) {
    try {
        const { email } = await req.json();
        const user = await prisma.user.findUnique({
            where: { email }
        });
        if (!user) {
            return Response.json({ message: "User does not exist. Create an account first." }, { status: 400 });
        }
        if (user.emailVerified) {
            return Response.json({ message: "User already verified. Please sign in." }, { status: 300 });
        }
        const otp = crypto.randomInt(100000, 999999).toString();
        const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // OTP valid for 5 minutes
        const sessionId = uuidv4();
        await prisma.otp.create({
            data: {
                email,
                sessionId,
                otp,
                expiresAt
            }
        });
        const cookie = serialize('sessionId', sessionId, {
            httpOnly: true,
            // secure: process.env.NODE_ENV === 'production',
            maxAge: 5 * 60, // Cookie valid for 5 minutes
            path: '/',
        });
        await transporter.sendMail({
            from: process.env.app_email,
            to: email,
            subject: 'Your OTP Code',
            text: `Your OTP is ${otp}. It will expire in 5 minutes.`,
            html: `<p>Your OTP is <b>${otp}</b>. It will expire in 5 minutes.</p>`
        });
        return new Response(JSON.stringify({ message: "OTP sent successfully" }), {
            status: 200,
            headers: { 'Set-Cookie': cookie, 'Content-Type': 'application/json' },
        });

    } catch (err) {
        return Response.json({ message: "Error while sending OTP" }, { status: 500 });
    }
}
