/*
  Warnings:

  - You are about to drop the column `courseId` on the `Rating` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Course` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `golfCourseId` to the `Rating` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_userId_fkey";

-- DropForeignKey
ALTER TABLE "Rating" DROP CONSTRAINT "Rating_courseId_fkey";

-- AlterTable
ALTER TABLE "Rating" DROP COLUMN "courseId",
ADD COLUMN     "golfCourseId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "role";

-- DropTable
DROP TABLE "Course";

-- CreateTable
CREATE TABLE "GolfCourse" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "ownerId" INTEGER NOT NULL,
    "images" TEXT[],

    CONSTRAINT "GolfCourse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Owner" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Owner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeeTime" (
    "id" SERIAL NOT NULL,
    "golfCourseId" INTEGER NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "TeeTime_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rate" (
    "id" SERIAL NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "type" TEXT NOT NULL,
    "numHoles" INTEGER NOT NULL,
    "golfCourseId" INTEGER NOT NULL,

    CONSTRAINT "Rate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_GolfCourseToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_GolfCourseToUser_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_GolfCourseToUser_B_index" ON "_GolfCourseToUser"("B");

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_golfCourseId_fkey" FOREIGN KEY ("golfCourseId") REFERENCES "GolfCourse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GolfCourse" ADD CONSTRAINT "GolfCourse_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Owner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeeTime" ADD CONSTRAINT "TeeTime_golfCourseId_fkey" FOREIGN KEY ("golfCourseId") REFERENCES "GolfCourse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rate" ADD CONSTRAINT "Rate_golfCourseId_fkey" FOREIGN KEY ("golfCourseId") REFERENCES "GolfCourse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GolfCourseToUser" ADD CONSTRAINT "_GolfCourseToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "GolfCourse"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GolfCourseToUser" ADD CONSTRAINT "_GolfCourseToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
