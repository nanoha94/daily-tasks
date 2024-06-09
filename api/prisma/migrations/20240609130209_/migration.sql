/*
  Warnings:

  - Added the required column `category` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numOfGood` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Made the column `content` on table `Task` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "numOfGood" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Profile" ALTER COLUMN "profileSrc" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Task" ALTER COLUMN "content" SET NOT NULL;
