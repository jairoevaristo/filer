/*
  Warnings:

  - You are about to drop the column `download_at` on the `shares` table. All the data in the column will be lost.
  - You are about to drop the `shared_to_users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "shared_to_users" DROP CONSTRAINT "shared_to_users_shareId_fkey";

-- DropForeignKey
ALTER TABLE "shared_to_users" DROP CONSTRAINT "shared_to_users_userId_fkey";

-- AlterTable
ALTER TABLE "shares" DROP COLUMN "download_at";

-- DropTable
DROP TABLE "shared_to_users";
