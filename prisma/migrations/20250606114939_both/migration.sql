/*
  Warnings:

  - The `topic` column on the `Quiz` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterEnum
ALTER TYPE "QuestionType" ADD VALUE 'both';

-- AlterTable
ALTER TABLE "Question" ALTER COLUMN "type" SET DEFAULT 'single';

-- AlterTable
ALTER TABLE "Quiz" DROP COLUMN "topic",
ADD COLUMN     "topic" TEXT[];
