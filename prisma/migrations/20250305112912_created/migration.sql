-- CreateTable
CREATE TABLE "Coverletter" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "jobDescription" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "jobTitle" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Coverletter_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Coverletter_userId_idx" ON "Coverletter"("userId");

-- AddForeignKey
ALTER TABLE "Coverletter" ADD CONSTRAINT "Coverletter_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
