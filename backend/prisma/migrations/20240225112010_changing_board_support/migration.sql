/*
  Warnings:

  - You are about to drop the column `about` on the `Board` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Board` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Board" DROP COLUMN "about",
DROP COLUMN "createdAt";
