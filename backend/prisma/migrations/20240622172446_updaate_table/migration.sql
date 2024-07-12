/*
  Warnings:

  - You are about to drop the column `shareId` on the `users` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_shareId_fkey";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "shareId";

-- CreateTable
CREATE TABLE "_ShareToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ShareToUser_AB_unique" ON "_ShareToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_ShareToUser_B_index" ON "_ShareToUser"("B");

-- AddForeignKey
ALTER TABLE "_ShareToUser" ADD CONSTRAINT "_ShareToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "shares"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ShareToUser" ADD CONSTRAINT "_ShareToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
