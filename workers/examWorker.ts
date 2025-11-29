import amqp from "amqplib";
import { PrismaClient } from "@prisma/client";
import { questionWithOptionsSchema } from "@/lib/validation";

const prisma = new PrismaClient();

async function startWorker() {
  try {
    const connection = await amqp.connect("amqp://guest:guest@localhost:5672");
    const channel = await connection.createChannel();
    const queue = "exam-submissions";

    // 1️⃣ Durable queue
    await channel.assertQueue(queue, { durable: true });
    console.log("Worker listening for submissions...");

    // 2️⃣ Consume messages
    channel.consume(queue, async (msg) => {
      if (!msg) return;

      try {
        const submission = JSON.parse(msg.content.toString());

        // 3️⃣ Validate structure
        submission.questions.forEach((q: any) => questionWithOptionsSchema.parse(q));

        // 4️⃣ Check answers
        let correctCount = 0;
        for (const q of submission.questions) {
          const isCorrect = q.options.every((o: any) => o.isPicked === o.isCorrect);
          if (isCorrect) correctCount++;
        }

        const percentage = (correctCount / submission.questions.length) * 100;

        // 5️⃣ Save submission & responses in DB
        const newSubmission = await prisma.submission.create({
          data: {
            userId: submission.userId,
            quizId: submission.quizId,
            time: submission.time,
            percentage: percentage.toString(),
            response: {
              create: submission.questions.map((q: any) => ({
                questionId: q.id,
                verdict: q.options.every((o: any) => o.isPicked === o.isCorrect),
                selected: {
                  create: q.options
                    .filter((o: any) => o.isPicked)
                    .map((o: any) => ({ optionId: o.id })),
                },
              })),
            },
          },
        });

        console.log(`Submission processed and saved: ${newSubmission.id}`);

        // 6️⃣ Acknowledge message
        channel.ack(msg);
      } catch (err) {
        console.error("Failed to process message:", err);
        channel.ack(msg); // remove bad message to prevent blocking
      }
    });
  } catch (err) {
    console.error("Worker failed:", err);
  }
}

startWorker();
