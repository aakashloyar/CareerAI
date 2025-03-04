"use server";

import {prisma} from "@/lib/prisma";
import { transporter } from "@/config/email";

export async function sendOTP(email: string) {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  // Store OTP in the database with expiration
  await prisma.otp.create({
    data: {
      email,
      otp,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000), // Valid for 5 minutes
    },
  });

  // Send email
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP is: ${otp}. It is valid for 5 minutes.`,
  });

  return { message: "OTP sent successfully!" };
}

export async function verifyOTP(email: string, enteredOTP: string) {
  const otpRecord = await prisma.otp.findFirst({
    where: { email, otp: enteredOTP },
  });

  if (!otpRecord || new Date() > otpRecord.expiresAt) {
    return { error: "Invalid or expired OTP." };
  }

  // Delete OTP after verification
  await prisma.otp.deleteMany({ where: { email } });

  return { success: "OTP verified successfully!" };
}
