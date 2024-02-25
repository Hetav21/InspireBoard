/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Pin` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Pin" DROP CONSTRAINT "Pin_postId_fkey";

-- CreateIndex
CREATE UNIQUE INDEX "Pin_userId_key" ON "Pin"("userId");

-- AddForeignKey
ALTER TABLE "Pin" ADD CONSTRAINT "Pin_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
