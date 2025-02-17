/*
  Warnings:

  - You are about to drop the `Rating` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Rate" DROP CONSTRAINT "Rate_golfCourseId_fkey";

-- DropForeignKey
ALTER TABLE "Rating" DROP CONSTRAINT "Rating_golfCourseId_fkey";

-- DropForeignKey
ALTER TABLE "TeeTime" DROP CONSTRAINT "TeeTime_golfCourseId_fkey";

-- DropForeignKey
ALTER TABLE "TeeTime" DROP CONSTRAINT "TeeTime_userId_fkey";

-- DropTable
DROP TABLE "Rating";

-- CreateTable
CREATE TABLE "Review" (
    "id" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "body" TEXT NOT NULL,
    "golfCourseId" TEXT NOT NULL,
    "images" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_golfCourseId_fkey" FOREIGN KEY ("golfCourseId") REFERENCES "GolfCourse"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeeTime" ADD CONSTRAINT "TeeTime_golfCourseId_fkey" FOREIGN KEY ("golfCourseId") REFERENCES "GolfCourse"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeeTime" ADD CONSTRAINT "TeeTime_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rate" ADD CONSTRAINT "Rate_golfCourseId_fkey" FOREIGN KEY ("golfCourseId") REFERENCES "GolfCourse"("id") ON DELETE CASCADE ON UPDATE CASCADE;
