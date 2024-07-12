/*
  Warnings:

  - You are about to drop the column `shared_to_user_id` on the `shares` table. All the data in the column will be lost.
  - You are about to drop the `_SharedToUsers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_SharedToUsers" DROP CONSTRAINT "_SharedToUsers_A_fkey";

-- DropForeignKey
ALTER TABLE "_SharedToUsers" DROP CONSTRAINT "_SharedToUsers_B_fkey";

-- AlterTable
ALTER TABLE "shares" DROP COLUMN "shared_to_user_id";

-- DropTable
DROP TABLE "_SharedToUsers";

-- CreateTable
CREATE TABLE "shared_to_users" (
    "id" TEXT NOT NULL,
    "shareId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "shared_to_users_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "shared_to_users" ADD CONSTRAINT "shared_to_users_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shared_to_users" ADD CONSTRAINT "shared_to_users_shareId_fkey" FOREIGN KEY ("shareId") REFERENCES "shares"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
