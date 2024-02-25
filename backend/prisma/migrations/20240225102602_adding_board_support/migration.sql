-- AlterTable
ALTER TABLE "Pin" ADD COLUMN     "boardId" TEXT;

-- CreateTable
CREATE TABLE "Board" (
    "boardId" TEXT NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "about" VARCHAR(255),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Board_pkey" PRIMARY KEY ("boardId")
);

-- AddForeignKey
ALTER TABLE "Board" ADD CONSTRAINT "Board_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pin" ADD CONSTRAINT "Pin_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "Board"("boardId") ON DELETE SET NULL ON UPDATE CASCADE;
