// app/api/submitExam/route.ts
import { NextRequest, NextResponse } from "next/server";
import amqp from "amqplib";

export async function POST(req: NextRequest) {
  const submission = await req.json();

  const connection = await amqp.connect("amqp://guest:guest@localhost:5672");
  const channel = await connection.createChannel();
  const queue = "exam-submissions";

  await channel.assertQueue(queue);
  channel.sendToQueue(queue, Buffer.from(JSON.stringify(submission)));

  await channel.close();
  await connection.close();

  return NextResponse.json({ status: "submitted" });
}
