-- DropForeignKey
ALTER TABLE "Pin" DROP CONSTRAINT "Pin_userId_fkey";

-- AddForeignKey
ALTER TABLE "Pin" ADD CONSTRAINT "Pin_postId_fkey" FOREIGN KEY ("postId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
