-- CreateTable
CREATE TABLE "Pin" (
    "postId" TEXT NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "about" VARCHAR(255),
    "url" VARCHAR(255) NOT NULL,
    "category" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Pin_pkey" PRIMARY KEY ("postId")
);

-- AddForeignKey
ALTER TABLE "Pin" ADD CONSTRAINT "Pin_postId_fkey" FOREIGN KEY ("postId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
