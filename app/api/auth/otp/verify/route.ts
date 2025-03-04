import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { parse } from 'cookie';

export async function POST(req: NextRequest) {
    try {
        const { email, otp } = await req.json();
        const cookieHeader = req.headers.get('cookie');
        if (!cookieHeader) {
            return Response.json({ message: "Session not found" }, { status: 400 });
        }
        const cookies = parse(cookieHeader);
        const sessionId = cookies.sessionId;

        if (!sessionId) {
            return Response.json({ message: "Invalid session. Try resending OTP." }, { status: 400 });
        }

        // Find OTP entry
        const otpEntry = await prisma.otp.findUnique({
            where: { sessionId,email }
        });
        if (!otpEntry || otpEntry.otp !== otp || otpEntry.expiresAt < new Date()) {
            return Response.json({ message: "Invalid or expired OTP" }, { status: 400 });
        }

        // Mark user as verified
        await prisma.user.update({
            where: { email },
            data: { emailVerified: true}
        });
        // Delete OTP entry
        await prisma.otp.delete({ where: { sessionId,email} });
        return Response.json({ message: "Email verified successfully" }, { status: 200 });

    } catch (err) {
        console.error('Error:', err);
        return Response.json({ message: "Error verifying OTP" }, { status: 500 });
    }
}
