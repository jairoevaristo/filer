/*
  Warnings:

  - Added the required column `supabase_path` to the `files` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "files" ADD COLUMN     "supabase_path" TEXT NOT NULL;
