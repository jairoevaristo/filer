/*
  Warnings:

  - Added the required column `permission` to the `shares` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Permission" AS ENUM ('VIEWER', 'EDITOR');

-- AlterTable
ALTER TABLE "shares" ADD COLUMN     "permission" "Permission" NOT NULL;
