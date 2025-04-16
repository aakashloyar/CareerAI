import {prisma} from "@/lib/prisma"
import {options} from '@/auth'
import { getServerSession } from "next-auth";
export async function getCoverLetter(id:string) {
    const session = await getServerSession(options);
    if (!session || !session.user?.id) throw new Error("Unauthorized");
    const userId=session.user.id;
    console.log(userId+"********");
    console.log(id);
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) throw new Error("User not found");
    return await prisma.coverletter.findUnique({
      where: {
        id,
        userId,
      },
    });
  }