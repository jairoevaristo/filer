/*
  Warnings:

  - The `shared_to_user_id` column on the `shares` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "shares" DROP COLUMN "shared_to_user_id",
ADD COLUMN     "shared_to_user_id" TEXT[];
