/*
  Warnings:

  - You are about to drop the column `shared_user_id` on the `shares` table. All the data in the column will be lost.
  - Added the required column `shared_to_user_id` to the `shares` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "shares" DROP COLUMN "shared_user_id",
ADD COLUMN     "shared_to_user_id" TEXT NOT NULL;
