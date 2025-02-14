/*
  Warnings:

  - Added the required column `userId` to the `TeeTime` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TeeTime" ADD COLUMN     "players" TEXT[],
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "TeeTime" ADD CONSTRAINT "TeeTime_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
