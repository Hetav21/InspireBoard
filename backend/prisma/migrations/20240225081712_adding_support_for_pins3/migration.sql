-- DropForeignKey
ALTER TABLE "Pin" DROP CONSTRAINT "Pin_postId_fkey";

-- DropIndex
DROP INDEX "Pin_userId_key";

-- AddForeignKey
ALTER TABLE "Pin" ADD CONSTRAINT "Pin_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
