import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { userSignUpSchema } from "@/lib/validation";
import bcrypt from "bcryptjs";


export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    const validatedUser = userSignUpSchema.safeParse(body);
    if (!validatedUser.success) {
      return NextResponse.json({ error: validatedUser.error.format() }, { status: 400 });
    }

    const { email, password, firstName, lastName } = validatedUser.data;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }    
    const hashedPassword=await hashPassword(validatedUser.data.password);
    const newUser = await prisma.user.create({
      data: {
        email,
        firstName,
        lastName,
        password:hashedPassword
      },
    });

    return NextResponse.json({ message: "User registered successfully" }, { status: 201 });

  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}


async function hashPassword(password: string): Promise<string> {
  console.log(password);
  console.log(parseInt(process.env.saltRounds!))
  const hashedPassword = await bcrypt.hash(password,parseInt(process.env.saltRounds!));
  return hashedPassword;
}

