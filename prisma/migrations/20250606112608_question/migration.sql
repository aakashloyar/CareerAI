/*
  Warnings:

  - Added the required column `type` to the `Question` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "QuestionType" AS ENUM ('single', 'multi');

-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "type" "QuestionType" NOT NULL;
