/*
  Warnings:

  - You are about to drop the column `price` on the `TeeTime` table. All the data in the column will be lost.
  - Added the required column `numHoles` to the `TeeTime` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TeeTime" DROP COLUMN "price",
ADD COLUMN     "numHoles" INTEGER NOT NULL;
