-- AlterTable
ALTER TABLE "Owner" ADD COLUMN     "isOwner" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isOwner" BOOLEAN NOT NULL DEFAULT false;
