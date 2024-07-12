/*
  Warnings:

  - You are about to drop the column `sharedToUsersIds` on the `shares` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "shares" DROP CONSTRAINT "shares_userId_fkey";

-- AlterTable
ALTER TABLE "shares" DROP COLUMN "sharedToUsersIds";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "shareId" TEXT;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_shareId_fkey" FOREIGN KEY ("shareId") REFERENCES "shares"("id") ON DELETE SET NULL ON UPDATE CASCADE;
