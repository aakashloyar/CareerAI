import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { userSignUpSchema } from "@/lib/validation";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Validate input using Zod
    const validatedUser = userSignUpSchema.safeParse(body);
    if (!validatedUser.success) {
      return NextResponse.json({ error: validatedUser.error.format() }, { status: 400 });
    }

    const { email, password, firstName, lastName } = validatedUser.data;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    // Hash the password

    // Create new user
    const newUser = await prisma.user.create({
      data: {
        email,
        firstName,
        lastName,
        password, // Store the hashed password
      },
    });

    return NextResponse.json({ message: "User registered successfully" }, { status: 201 });

  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
