-- DropForeignKey
ALTER TABLE "GolfCourse" DROP CONSTRAINT "GolfCourse_ownerId_fkey";

-- AlterTable
ALTER TABLE "GolfCourse" ADD COLUMN     "description" TEXT;

-- AddForeignKey
ALTER TABLE "GolfCourse" ADD CONSTRAINT "GolfCourse_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Owner"("id") ON DELETE CASCADE ON UPDATE CASCADE;
