-- DropForeignKey
ALTER TABLE "shares" DROP CONSTRAINT "shares_fileId_fkey";

-- AddForeignKey
ALTER TABLE "shares" ADD CONSTRAINT "shares_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "files"("id") ON DELETE CASCADE ON UPDATE CASCADE;
