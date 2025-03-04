-- CreateIndex
CREATE INDEX "Otp_email_sessionId_idx" ON "Otp"("email", "sessionId");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Otp" ADD CONSTRAINT "Otp_email_fkey" FOREIGN KEY ("email") REFERENCES "User"("email") ON DELETE CASCADE ON UPDATE CASCADE;
