/*
  Warnings:

  - Added the required column `shared_user_id` to the `shares` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "shares" ADD COLUMN     "shared_user_id" TEXT NOT NULL;
