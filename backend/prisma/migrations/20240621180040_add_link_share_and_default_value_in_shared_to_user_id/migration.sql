/*
  Warnings:

  - Added the required column `link` to the `shares` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "shares" ADD COLUMN     "link" TEXT NOT NULL,
ALTER COLUMN "shared_to_user_id" SET DEFAULT ARRAY[]::TEXT[];
