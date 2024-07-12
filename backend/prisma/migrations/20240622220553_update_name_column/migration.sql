/*
  Warnings:

  - You are about to drop the column `public` on the `shares` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "shares" DROP COLUMN "public",
ADD COLUMN     "public_share" BOOLEAN DEFAULT false;
