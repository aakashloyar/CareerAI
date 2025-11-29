import { NextRequest, NextResponse } from "next/server";
import amqp from "amqplib";

export async function POST(req: NextRequest) {
  const questions = await req.json(); // now this is the array itself
  console.log(questions)
  //console.log(message)
  const connection = await amqp.connect("amqp://guest:guest@localhost:5672");
  const channel = await connection.createChannel();
  const queue = "exam-submissions";
  await channel.assertQueue(queue);
  channel.sendToQueue(queue, Buffer.from(JSON.stringify(questions)),{ persistent: true });

  await channel.close();
  await connection.close();
  console.log("Done******")
  return NextResponse.json({ status: "Message sent" });
}
