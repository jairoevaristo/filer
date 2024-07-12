/*
  Warnings:

  - You are about to drop the column `sharedToUsers` on the `shares` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "shares" DROP COLUMN "sharedToUsers",
ADD COLUMN     "sharedToUsersIds" TEXT[];
