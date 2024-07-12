/*
  Warnings:

  - You are about to drop the `encryptions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "encryptions" DROP CONSTRAINT "encryptions_fileId_fkey";

-- DropTable
DROP TABLE "encryptions";
