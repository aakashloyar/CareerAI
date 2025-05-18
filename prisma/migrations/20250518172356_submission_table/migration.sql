/*
  Warnings:

  - You are about to drop the column `count` on the `Submission` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Submission` table. All the data in the column will be lost.
  - You are about to drop the column `topic` on the `Submission` table. All the data in the column will be lost.
  - Added the required column `quizId` to the `Submission` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Submission_name_idx";

-- AlterTable
ALTER TABLE "Submission" DROP COLUMN "count",
DROP COLUMN "name",
DROP COLUMN "topic",
ADD COLUMN     "quizId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "Quiz"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Response" ADD CONSTRAINT "Response_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Questions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
