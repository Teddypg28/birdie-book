/*
  Warnings:

  - Added the required column `isAvailable` to the `TeeTime` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TeeTime" ADD COLUMN     "isAvailable" BOOLEAN NOT NULL;
