/*
  Warnings:

  - You are about to drop the `Questions` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `verdict` to the `Response` table without a default value. This is not possible if the table is not empty.
  - Added the required column `percentage` to the `Submission` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Questions" DROP CONSTRAINT "Questions_quizId_fkey";

-- DropForeignKey
ALTER TABLE "Response" DROP CONSTRAINT "Response_questionId_fkey";

-- DropForeignKey
ALTER TABLE "Submission" DROP CONSTRAINT "Submission_userId_fkey";

-- AlterTable
ALTER TABLE "Response" ADD COLUMN     "verdict" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "Submission" ADD COLUMN     "percentage" TEXT NOT NULL,
ADD COLUMN     "sumbittedAt" TIMESTAMP(3);

-- DropTable
DROP TABLE "Questions";

-- CreateTable
CREATE TABLE "Question" (
    "id" TEXT NOT NULL,
    "quizId" TEXT NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Option" (
    "id" TEXT NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "Option_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QueOpt" (
    "questionId" TEXT NOT NULL,
    "optionId" TEXT NOT NULL,
    "isCorrect" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "QueOpt_pkey" PRIMARY KEY ("questionId","optionId")
);

-- CreateIndex
CREATE INDEX "Question_quizId_idx" ON "Question"("quizId");

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "Quiz"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QueOpt" ADD CONSTRAINT "QueOpt_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QueOpt" ADD CONSTRAINT "QueOpt_optionId_fkey" FOREIGN KEY ("optionId") REFERENCES "Option"("id") ON DELETE CASCADE ON UPDATE CASCADE;
