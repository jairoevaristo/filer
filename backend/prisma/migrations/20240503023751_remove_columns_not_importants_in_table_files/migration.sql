/*
  Warnings:

  - You are about to drop the column `original_name` on the `files` table. All the data in the column will be lost.
  - Changed the type of `size` on the `files` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "files" DROP COLUMN "original_name",
DROP COLUMN "size",
ADD COLUMN     "size" BIGINT NOT NULL;
