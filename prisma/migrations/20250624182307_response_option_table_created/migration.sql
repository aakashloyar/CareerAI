/*
  Warnings:

  - You are about to drop the column `selection` on the `Response` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Response" DROP COLUMN "selection";

-- CreateTable
CREATE TABLE "ResponseOption" (
    "responseId" TEXT NOT NULL,
    "optionId" TEXT NOT NULL,

    CONSTRAINT "ResponseOption_pkey" PRIMARY KEY ("responseId")
);

-- CreateIndex
CREATE INDEX "Response_questionId_idx" ON "Response"("questionId");

-- AddForeignKey
ALTER TABLE "Response" ADD CONSTRAINT "Response_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResponseOption" ADD CONSTRAINT "ResponseOption_responseId_fkey" FOREIGN KEY ("responseId") REFERENCES "Response"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResponseOption" ADD CONSTRAINT "ResponseOption_optionId_fkey" FOREIGN KEY ("optionId") REFERENCES "Option"("id") ON DELETE CASCADE ON UPDATE CASCADE;
