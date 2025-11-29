/*
  Warnings:

  - Added the required column `startedAt` to the `Submission` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Submission" ADD COLUMN     "startedAt" TIMESTAMP(3) NOT NULL;
