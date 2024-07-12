-- CreateTable
CREATE TABLE "encryptions" (
    "id" TEXT NOT NULL,
    "iv" TEXT NOT NULL,
    "tag" TEXT NOT NULL,
    "fileId" TEXT NOT NULL,

    CONSTRAINT "encryptions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "encryptions" ADD CONSTRAINT "encryptions_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "files"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
